import { test, expect } from '@playwright/test';

/**
 * EggBuilds Interaction Tests
 * Tests user interactions and dynamic behavior
 */

test.describe('Dashboard Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage for fresh start
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should incubate new tests when button clicked', async ({ page }) => {
    const incubateBtn = page.locator('#incubate-btn');
    const status = page.locator('#incubator-status');

    // Initial state
    await expect(status).toContainText('Ready to incubate');

    // Click incubate
    await incubateBtn.click();

    // Button should be disabled during incubation
    await expect(incubateBtn).toBeDisabled();

    // Status should update
    await expect(status).toContainText('Incubating tests');

    // Running badge should appear
    const runningBadge = page.locator('#running-badge');
    await expect(runningBadge).toBeVisible();
  });

  test('should show running eggs in active incubator', async ({ page }) => {
    await page.locator('#incubate-btn').click();

    // Wait a bit for eggs to appear
    await page.waitForTimeout(500);

    // Check for running egg cards
    const runningEggs = page.locator('.egg-card.running');
    await expect(runningEggs.first()).toBeVisible();

    // Eggs should have running status
    await expect(page.locator('.egg-status:has-text("Running")')).toHaveCount({ min: 1 });
  });

  test('should update stats after tests complete', async ({ page }) => {
    // Get initial stats
    const totalTests = page.locator('#total-tests');
    const initialTotal = await totalTests.textContent();

    // Incubate tests
    await page.locator('#incubate-btn').click();

    // Wait for tests to complete (max 10 seconds)
    await page.waitForTimeout(10000);

    // Stats should have updated
    const newTotal = await totalTests.textContent();
    expect(parseInt(newTotal || '0')).toBeGreaterThan(parseInt(initialTotal || '0'));
  });

  test('should show completed eggs in recent hatches', async ({ page }) => {
    await page.locator('#incubate-btn').click();

    // Wait for tests to complete
    await page.waitForTimeout(10000);

    // Check for completed egg cards
    const resultsGrid = page.locator('#results-grid');
    const eggCards = resultsGrid.locator('.egg-card');

    await expect(eggCards.first()).toBeVisible();

    // Should have either passed or failed status
    const passedOrFailed = page.locator('.egg-card.passed, .egg-card.failed');
    await expect(passedOrFailed.first()).toBeVisible();
  });

  test('should filter results by environment', async ({ page }) => {
    // First, generate some test data
    await page.locator('#incubate-btn').click();
    await page.waitForTimeout(10000);

    const filterEnv = page.locator('#filter-environment');

    // Filter by Dev Nest
    await filterEnv.selectOption('dev');
    await page.waitForTimeout(500);

    // Check that only dev eggs are shown (if any)
    const devEggs = page.locator('.egg-env:has-text("Dev Nest")');
    const stagingEggs = page.locator('.egg-env:has-text("Staging Nest")');

    // If dev eggs exist, staging eggs shouldn't be visible
    const devCount = await devEggs.count();
    if (devCount > 0) {
      await expect(stagingEggs).toHaveCount(0);
    }
  });

  test('should filter results by status', async ({ page }) => {
    // Generate test data
    await page.locator('#incubate-btn').click();
    await page.waitForTimeout(10000);

    const filterStatus = page.locator('#filter-status');

    // Filter by passed
    await filterStatus.selectOption('passed');
    await page.waitForTimeout(500);

    // Check that only passed eggs are shown (if any)
    const passedEggs = page.locator('.egg-card.passed');
    const failedEggs = page.locator('.egg-card.failed');

    const passedCount = await passedEggs.count();
    if (passedCount > 0) {
      await expect(failedEggs).toHaveCount(0);
    }
  });

  test('should persist data in localStorage', async ({ page }) => {
    // Incubate and wait for completion
    await page.locator('#incubate-btn').click();
    await page.waitForTimeout(10000);

    // Get current stats
    const totalBefore = await page.locator('#total-tests').textContent();

    // Reload page
    await page.reload();

    // Stats should be the same (persisted)
    const totalAfter = await page.locator('#total-tests').textContent();
    expect(totalBefore).toBe(totalAfter);
  });
});
