import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test('should navigate through page with Tab key', async ({ page }) => {
    await page.goto('/');

    // First Tab should focus on logo link
    await page.keyboard.press('Tab');
    const logoLink = page.locator('a').filter({ hasText: 'Chameleon' }).first();
    await expect(logoLink).toBeFocused();

    // Second Tab should focus on navigation
    await page.keyboard.press('Tab');
    const navLink = page.locator('nav a').first();
    await expect(navLink).toBeFocused();

    // Third Tab should focus on slider
    await page.keyboard.press('Tab');
    const slider = page.locator('#vibe-slider');
    await expect(slider).toBeFocused();
  });

  test('should activate links with Enter key', async ({ page }) => {
    await page.goto('/');

    // Tab to Projects link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Press Enter to navigate
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/projects/);
  });

  test('should control slider with arrow keys', async ({ page }) => {
    await page.goto('/');

    const slider = page.locator('#vibe-slider');

    // Focus on slider
    await slider.focus();
    await expect(slider).toBeFocused();

    const initialValue = await slider.inputValue();

    // Press Arrow Right
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(50);
    const valueAfterRight = await slider.inputValue();
    expect(parseInt(valueAfterRight)).toBeGreaterThan(parseInt(initialValue));

    // Press Arrow Left
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(50);
    const valueAfterLeft = await slider.inputValue();
    expect(parseInt(valueAfterLeft)).toBeLessThanOrEqual(parseInt(valueAfterRight));
  });

  test('should jump to slider ends with Home/End keys', async ({ page }) => {
    await page.goto('/');

    const slider = page.locator('#vibe-slider');
    await slider.focus();

    // Press End to go to 100
    await page.keyboard.press('End');
    await page.waitForTimeout(50);
    let value = await slider.inputValue();
    expect(value).toBe('100');

    // Press Home to go to 0
    await page.keyboard.press('Home');
    await page.waitForTimeout(50);
    value = await slider.inputValue();
    expect(value).toBe('0');
  });

  test('should use Page Up/Down for larger jumps', async ({ page }) => {
    await page.goto('/');

    const slider = page.locator('#vibe-slider');
    await slider.fill('50');
    await slider.focus();

    // Press Page Down
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(50);
    const valueAfterPageDown = await slider.inputValue();
    expect(parseInt(valueAfterPageDown)).toBeLessThan(50);

    // Press Page Up
    await page.keyboard.press('PageUp');
    await page.waitForTimeout(50);
    const valueAfterPageUp = await slider.inputValue();
    expect(parseInt(valueAfterPageUp)).toBeGreaterThan(parseInt(valueAfterPageDown));
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a');
    const count = await links.count();

    // Tab through all links
    for (let i = 0; i < Math.min(count, 5); i++) {
      await page.keyboard.press('Tab');

      // Check that focused element has visible focus style
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineOffset: styles.outlineOffset,
          boxShadow: styles.boxShadow
        };
      });

      // Should have some kind of focus indicator
      const hasFocusIndicator =
        focused.outline !== 'none' ||
        focused.boxShadow !== 'none';

      expect(hasFocusIndicator).toBeTruthy();
    }
  });

  test('should have logical tab order', async ({ page }) => {
    await page.goto('/');

    const focusOrder = [];

    // Tab through first 10 elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el.tagName,
          text: el.textContent?.slice(0, 30) || '',
          href: el.href || ''
        };
      });
      focusOrder.push(focused);
    }

    // First should be logo/header link
    expect(focusOrder[0].tag).toBe('A');
    expect(focusOrder[0].text).toContain('Chameleon');

    // Should include navigation links
    const hasNavLink = focusOrder.some(f =>
      f.href.includes('/projects') || f.href.includes('/about')
    );
    expect(hasNavLink).toBeTruthy();
  });

  test('should allow Escape key for potential modal closing', async ({ page }) => {
    await page.goto('/');

    // Currently no modals, but Escape shouldn't cause errors
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Should still be on same page
    await expect(page).toHaveURL(/\//);
  });
});
