import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/signup');
});

test.describe('Validation', () => {
  test('should show error message when credentials are empty', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.getByTestId('error-message')).toHaveText([
      'Please enter your name',
      'Please enter email address',
      'Please enter password',
    ]);
  });

  test('should show error message when credentials are invalid', async ({
    page,
  }) => {
    await signup(page, '', 'hello', 'world');

    await expect(page.getByTestId('error-message')).toHaveText([
      'Please enter your name',
      'Please enter valid email address',
      'Password must be at least 6 characters long',
    ]);
  });
});

test.describe('Navigations', () => {
  test('should navigate to sign in page when clicking on the sign in link', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/signin');
  });
});

test.describe('Signup', () => {
  test('should display error message when user already exists', async ({
    page,
  }) => {
    await signup(page, 'test', 'test@gmail.com', '123456');

    await expect(page.getByText('User already exists')).toBeVisible();
  });

  test('should sign up successfully with valid credentials', async ({
    page,
  }) => {
    await signup(page, 'test', 'test2@gmail.com', '123456');

    await expect(page).toHaveURL('/dashboard');
  });
});

async function signup(
  page: Page,
  name: string,
  email: string,
  password: string
) {
  await page.getByRole('textbox', { name: 'name' }).fill(name);
  await page.getByRole('textbox', { name: 'email' }).fill(email);
  await page.getByRole('textbox', { name: 'password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
}
