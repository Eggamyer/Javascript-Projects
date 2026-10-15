import { test, expect } from '@playwright/test';

/**
 * EggBuilds Dashboard Tests
 * Tests the automation metrics dashboard functionality
 */

test.describe('EggBuilds Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load dashboard with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/EggBuilds.*Automation Metrics Dashboard/);

    // Verify header is present
    const header = page.locator('h1:has-text("EggBuilds")');
    await expect(header).toBeVisible();
  });

  test('should display all stat cards', async ({ page }) => {
    // Check for all 4 stat cards
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(4);

    // Verify stat card labels
    await expect(page.locator('text=Total Tests')).toBeVisible();
    await expect(page.locator('text=Passed')).toBeVisible();
    await expect(page.locator('text=Failed')).toBeVisible();
    await expect(page.locator('text=Pass Rate')).toBeVisible();
  });

  test('should have incubate button', async ({ page }) => {
    const incubateBtn = page.locator('#incubate-btn');
    await expect(incubateBtn).toBeVisible();
    await expect(incubateBtn).toContainText('Incubate New Tests');
  });

  test('should show empty state when no tests run', async ({ page }) => {
    // Clear localStorage first
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const emptyState = page.locator('.empty-state').first();
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('No tests currently running');
  });

  test('should have environment filter options', async ({ page }) => {
    const filterEnv = page.locator('#filter-environment');
    await expect(filterEnv).toBeVisible();

    // Check filter options
    const options = await filterEnv.locator('option').allTextContents();
    expect(options).toContain('All Environments');
    expect(options.some(opt => opt.includes('Dev Nest'))).toBeTruthy();
    expect(options.some(opt => opt.includes('Staging Nest'))).toBeTruthy();
    expect(options.some(opt => opt.includes('Production Nest'))).toBeTruthy();
  });

  test('should have status filter options', async ({ page }) => {
    const filterStatus = page.locator('#filter-status');
    await expect(filterStatus).toBeVisible();

    const options = await filterStatus.locator('option').allTextContents();
    expect(options).toContain('All Status');
    expect(options.some(opt => opt.includes('Passed'))).toBeTruthy();
    expect(options.some(opt => opt.includes('Failed'))).toBeTruthy();
  });

  test('should display footer with tech stack', async ({ page }) => {
    await expect(page.locator('text=Built by')).toBeVisible();
    await expect(page.locator('text=Will Egg')).toBeVisible();

    // Check tech badges
    await expect(page.locator('.tech-badge:has-text("GitHub")')).toBeVisible();
    await expect(page.locator('.tech-badge:has-text("CircleCI")')).toBeVisible();
    await expect(page.locator('.tech-badge:has-text("AWS")')).toBeVisible();
    await expect(page.locator('.tech-badge:has-text("TypeScript")')).toBeVisible();
    await expect(page.locator('.tech-badge:has-text("Playwright")')).toBeVisible();
  });
});
