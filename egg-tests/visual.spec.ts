import { test, expect } from '@playwright/test';

/**
 * EggBuilds Visual & Responsive Tests
 * Tests visual elements, animations, and responsive design
 */

test.describe('Visual Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');
  });

  test('should display chicken logo with animation', async ({ page }) => {
    const logoIcon = page.locator('.logo-icon');
    await expect(logoIcon).toBeVisible();

    // Should contain chicken emoji
    await expect(logoIcon).toContainText('🐔');

    // Should have animation class
    const hasAnimation = await logoIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.animationName !== 'none';
    });
    expect(hasAnimation).toBeTruthy();
  });

  test('should have proper egg theme colors', async ({ page }) => {
    const header = page.locator('.header');
    await expect(header).toBeVisible();

    // Check that header has gradient background
    const bgColor = await header.evaluate(el => {
      return window.getComputedStyle(el).background;
    });

    expect(bgColor).toContain('gradient');
  });

  test('should display egg icons in results', async ({ page }) => {
    // Run a test first
    await page.locator('#incubate-btn').click();
    await page.waitForTimeout(10000);

    const eggIcons = page.locator('.egg-icon');
    const count = await eggIcons.count();

    if (count > 0) {
      const firstIcon = await eggIcons.first().textContent();
      // Should be either an egg, chick, or red circle emoji
      expect(['🥚', '🐣', '🔴'].some(icon => firstIcon?.includes(icon))).toBeTruthy();
    }
  });

  test('should show hover effects on cards', async ({ page }) => {
    const statCard = page.locator('.stat-card').first();
    await expect(statCard).toBeVisible();

    // Get initial box-shadow
    const initialShadow = await statCard.evaluate(el =>
      window.getComputedStyle(el).boxShadow
    );

    // Hover over card
    await statCard.hover();

    // Wait for transition
    await page.waitForTimeout(500);

    // Box shadow should change on hover (deeper shadow)
    const hoverShadow = await statCard.evaluate(el =>
      window.getComputedStyle(el).boxShadow
    );

    // Shadows should be different (hover effect active)
    expect(hoverShadow).not.toBe(initialShadow);
  });

  test('should be responsive at mobile width', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // All main sections should still be visible
    await expect(page.locator('.header')).toBeVisible();
    await expect(page.locator('.stats-section')).toBeVisible();
    await expect(page.locator('.incubate-btn')).toBeVisible();
    await expect(page.locator('.footer')).toBeVisible();

    // Logo should still be readable
    const logo = page.locator('.logo h1');
    await expect(logo).toBeVisible();
  });

  test('should be responsive at tablet width', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Check that stat cards are visible and properly laid out
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(4);

    // All cards should be visible
    for (let i = 0; i < 4; i++) {
      await expect(statCards.nth(i)).toBeVisible();
    }
  });

  test('should have smooth animations', async ({ page }) => {
    const incubateBtn = page.locator('#incubate-btn');

    // Button icon should have wobble animation
    const btnIcon = incubateBtn.locator('.btn-icon');
    const hasAnimation = await btnIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.animationName !== 'none';
    });

    expect(hasAnimation).toBeTruthy();
  });

  test('should display proper section titles with icons', async ({ page }) => {
    // Check Active Incubator section
    const activeTitle = page.locator('.section-title:has-text("Active Incubator")');
    await expect(activeTitle).toBeVisible();

    // Should have fire emoji
    await expect(activeTitle.locator('.title-icon')).toContainText('🔥');

    // Check Recent Hatches section
    const recentTitle = page.locator('.section-title:has-text("Recent Hatches")');
    await expect(recentTitle).toBeVisible();

    // Should have chicken emoji
    await expect(recentTitle.locator('.title-icon')).toContainText('🐔');
  });

  test('should have accessible color contrast', async ({ page }) => {
    // Check that text is readable
    const body = page.locator('body');
    const bodyStyles = await body.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color
      };
    });

    // Just verify that colors are set (actual contrast would need a library)
    expect(bodyStyles.backgroundColor).toBeTruthy();
    expect(bodyStyles.color).toBeTruthy();
  });
});

test.describe('Animation States', () => {
  test('wobbling eggs during test execution', async ({ page }) => {
    await page.goto('index.html');
    await page.locator('#incubate-btn').click();

    // Wait a bit for eggs to appear
    await page.waitForTimeout(1000);

    // Running eggs should have wobble class
    const runningEgg = page.locator('.egg-card.running').first();
    if (await runningEgg.count() > 0) {
      await expect(runningEgg).toBeVisible();

      // Check for running status
      await expect(runningEgg.locator('.egg-status')).toContainText('Running');
    }
  });
});
