import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Validation', () => {
  test('should show error message when credentials are empty', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByTestId('error-message')).toHaveText([
      'Please enter email address',
      'Please enter password',
    ]);
  });

  test('should show error message when credentials are invalid', async ({
    page,
  }) => {
    await login(page, 'hello', 'world');

    await expect(page.getByTestId('error-message')).toHaveText([
      'Please enter valid email address',
      'Password must be at least 6 characters long',
    ]);
  });
});

test.describe('Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await login(page, 'test@gmail.com', '123456');

    await expect(page).toHaveURL('/dashboard');
  });
});

async function login(page: Page, email: string, password: string) {
  await page.getByRole('textbox', { name: 'email' }).fill(email);
  await page.getByRole('textbox', { name: 'password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}
