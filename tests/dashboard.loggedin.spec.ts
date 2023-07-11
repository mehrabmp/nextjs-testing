import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
});

test('should see sign out button if logged in', async ({ page }) => {
  await expect(page.getByText('Sign out')).toBeVisible();
});
