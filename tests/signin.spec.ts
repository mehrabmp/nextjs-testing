import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/signin');
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

test.describe('Navigations', () => {
  test('should navigate to sign up page when clicking on the sign up link', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();

    await expect(page).toHaveURL('/signup');
  });
});

test.describe('Signin', () => {
  test('should display error message when signing in with invalid credentials', async ({
    page,
  }) => {
    await login(page, 'test@gmail.com', '123123123123');

    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });

  test('should sign in successfully with valid credentials', async ({
    page,
  }) => {
    await login(page, 'test@gmail.com', '123456');

    await expect(page).toHaveURL('/dashboard');
  });
});

async function login(page: Page, email: string, password: string) {
  await page.getByRole('textbox', { name: 'email' }).fill(email);
  await page.getByRole('textbox', { name: 'password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}
