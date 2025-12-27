import { test, expect } from '@playwright/test';

test.describe('Vibe Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display slider element', async ({ page }) => {
    const slider = page.locator('#vibe-slider');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('type', 'range');
    await expect(slider).toHaveAttribute('min', '0');
    await expect(slider).toHaveAttribute('max', '100');
  });

  test('should have correct accessibility attributes', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    await expect(slider).toHaveAttribute('aria-label', 'Theme vibe slider');
    await expect(slider).toHaveAttribute('aria-valuemin', '0');
    await expect(slider).toHaveAttribute('aria-valuemax', '100');

    const initialValue = await slider.getAttribute('aria-valuenow');
    expect(initialValue).toBeTruthy();
  });

  test('should change theme when slider moves to 0 (Corporate)', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    await slider.fill('0');
    await page.waitForTimeout(100);

    // Check for Corporate theme colors
    const root = page.locator(':root');
    const bgColor = await root.evaluate(el => getComputedStyle(el).getPropertyValue('--color-bg'));
    const fontFamily = await root.evaluate(el => getComputedStyle(el).getPropertyValue('--font-family'));

    expect(bgColor).toBe('#ffffff');
    expect(fontFamily).toContain('Inter');
  });

  test('should change theme when slider moves to 100 (Wild)', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    await slider.fill('100');
    await page.waitForTimeout(100);

    // Check for Wild theme colors
    const root = page.locator(':root');
    const bgColor = await root.evaluate(el => getComputedStyle(el).getPropertyValue('--color-bg'));
    const primaryColor = await root.evaluate(el => getComputedStyle(el).getPropertyValue('--color-primary'));

    expect(bgColor).toBe('#0a0a0a');
    expect(primaryColor).toBe('#00ff9f');
  });

  test('should update vibe name display', async ({ page }) => {
    const slider = page.locator('#vibe-slider');
    const vibeName = page.getByText(/Corporate Professional|Clean Modern|Balanced Creative|Bold Expressive|Wild Experimental/);

    await slider.fill('0');
    await page.waitForTimeout(100);
    await expect(page.getByText('Corporate Professional')).toBeVisible();

    await slider.fill('50');
    await page.waitForTimeout(100);
    await expect(page.getByText('Balanced Creative')).toBeVisible();

    await slider.fill('100');
    await page.waitForTimeout(100);
    await expect(page.getByText('Wild Experimental')).toBeVisible();
  });

  test('should maintain smooth transitions during rapid movement', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    // Rapid movements
    await slider.fill('0');
    await page.waitForTimeout(50);
    await slider.fill('50');
    await page.waitForTimeout(50);
    await slider.fill('100');
    await page.waitForTimeout(100);

    // Verify final theme is applied
    const root = page.locator(':root');
    const bgColor = await root.evaluate(el => getComputedStyle(el).getPropertyValue('--color-bg'));
    expect(bgColor).toBe('#0a0a0a');
  });

  test('should be keyboard navigable', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    await slider.focus();
    await expect(slider).toBeFocused();

    // Test arrow keys
    const initialValue = await slider.inputValue();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(50);
    const newValue = await slider.inputValue();
    expect(parseInt(newValue)).toBeGreaterThan(parseInt(initialValue));
  });

  test('should clamp values between 0 and 100', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    await slider.fill('-10');
    await page.waitForTimeout(50);
    let value = await slider.inputValue();
    expect(parseInt(value)).toBeGreaterThanOrEqual(0);

    await slider.fill('150');
    await page.waitForTimeout(50);
    value = await slider.inputValue();
    expect(parseInt(value)).toBeLessThanOrEqual(100);
  });

  test('should display correct position indicator', async ({ page }) => {
    const slider = page.locator('#vibe-slider');

    await slider.fill('25');
    await page.waitForTimeout(100);

    // Should show position number
    await expect(page.getByText(/\(25\)/)).toBeVisible();
  });
});
