import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('sign in with test user', async ({ page }) => {
  await page.goto('/signin');
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Sign out')).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});
