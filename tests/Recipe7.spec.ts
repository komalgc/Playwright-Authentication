import { test, expect } from '@playwright/test'
import 'dotenv/config';

// 👩‍💻📱 🔐 Authenticate for multiple accounts via the API and use
//them in single test
//When to use:
//When the user log in via SSO and redirect to the app correctly



test('SSO -Google login', async ({ page }) => {
  await page.goto('https://stackoverflow.com/users/login')
  //redirect to Google login page
  await page.getByRole('button', { name: 'Log in with Google' }).click()
  await page.getByLabel('Email or phone').fill(process.env.GOOGLE_USER ?? "")
  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByLabel('Enter your password').fill(process.env.GOOGLE_PWD ?? "")
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Accept all cookies' }).click();
  await page.waitForURL('https://stackoverflow.com/');
  await expect(page.getByText('Welcome to Stack Overflow, buyerdev99!')).toBeVisible();
})