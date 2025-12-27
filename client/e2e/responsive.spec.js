import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should display correctly on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Header should be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Vibe slider should be visible
    const slider = page.locator('#vibe-slider');
    await expect(slider).toBeVisible();

    // Projects should stack vertically
    await page.goto('/projects');
    const cards = page.locator('.card');
    const firstCard = cards.first();
    const boundingBox = await firstCard.boundingBox();
    expect(boundingBox.width).toBeLessThan(350);
  });

  test('should display correctly on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/projects');

    // Should show 2 columns
    const cards = page.locator('.card');
    const firstCard = cards.first();
    const secondCard = cards.nth(1);

    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();

    // Second card should be to the right of first (2 column layout)
    expect(secondBox.x).toBeGreaterThan(firstBox.x);
  });

  test('should display correctly on desktop (1920px)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/projects');

    // Should show 3 columns
    const container = page.locator('.container');
    const boundingBox = await container.boundingBox();
    expect(boundingBox.width).toBeGreaterThan(1200);
  });

  test('should handle slider touch interactions on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const slider = page.locator('#vibe-slider');

    // Touch drag simulation
    const box = await slider.boundingBox();
    await page.touch().tap(box.x + box.width / 2, box.y + box.height / 2);

    // Verify slider is interactive
    await expect(slider).toBeFocused();
  });

  test('should display navigation correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Logo should be visible
    await expect(page.getByText('Chameleon')).toBeVisible();

    // Navigation might be hidden or condensed on mobile
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();

    // At minimum, logo should link to home
    const logoLink = page.locator('a').filter({ hasText: 'Chameleon' }).first();
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  test('should maintain readability on all viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1920, height: 1080 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/');

      // Text should be readable
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();

      const fontSize = await heading.evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });

      // Font size should be reasonable (not too small, not too large)
      const pxSize = parseInt(fontSize);
      expect(pxSize).toBeGreaterThan(20);
      expect(pxSize).toBeLessThan(100);
    }
  });

  test('should handle landscape orientation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');

    // Content should still be visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#vibe-slider')).toBeVisible();
  });
});
