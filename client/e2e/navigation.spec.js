import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Chameleon OS/);
    await expect(page.getByText('An Adaptive Portfolio')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Projects');
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.getByText('A collection of work')).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=About');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1')).toContainText(/About|Alex Designer/);
  });

  test('should navigate to project detail page', async ({ page }) => {
    await page.goto('/projects');
    const firstProject = page.locator('.card').first();
    await firstProject.click();

    await expect(page).toHaveURL(/\/projects\/[a-f0-9-]{36}/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate back using browser back button', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Projects');
    await expect(page).toHaveURL(/\/projects/);

    await page.goBack();
    await expect(page).toHaveURL(/\//);
    await expect(page.getByText('An Adaptive Portfolio')).toBeVisible();
  });

  test('should navigate forward using browser forward button', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Projects');
    await page.goBack();
    await page.goForward();
    await expect(page).toHaveURL(/\/projects/);
  });

  test('should show 404 for invalid routes', async ({ page }) => {
    await page.goto('/invalid-route');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('page you\'re looking for doesn\'t exist')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Home' })).toBeVisible();
  });

  test('should navigate from 404 to home', async ({ page }) => {
    await page.goto('/invalid-route');
    await page.click('text=Go Home');
    await expect(page).toHaveURL(/\//);
  });

  test('should have correct link in header', async ({ page }) => {
    await page.goto('/');

    const homeLink = page.locator('a').filter({ hasText: 'Chameleon' }).first();
    await expect(homeLink).toHaveAttribute('href', '/');

    await page.goto('/projects');
    await homeLink.click();
    await expect(page).toHaveURL(/\//);
  });
});

test.describe('Project Detail Navigation', () => {
  test('should go back to projects from detail', async ({ page }) => {
    await page.goto('/projects');
    const firstProject = page.locator('.card').first();
    await firstProject.click();

    await page.click('text=Back to Projects');
    await expect(page).toHaveURL(/\/projects/);
  });

  test('should load project with valid UUID', async ({ page }) => {
    // Get a valid project ID first
    await page.goto('/projects');
    const projectLink = page.locator('a[href*="/projects/"]').first();
    const href = await projectLink.getAttribute('href');
    const projectId = href.split('/').pop();

    await page.goto(`/projects/${projectId}`);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should show not found for invalid project UUID', async ({ page }) => {
    await page.goto('/projects/00000000-0000-0000-0000-000000000000');
    await expect(page.getByText('Project Not Found')).toBeVisible();
    await expect(page.getByRole('button', { name: /Go Back/ })).toBeVisible();
  });
});
