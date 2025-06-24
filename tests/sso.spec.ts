import { test } from '@playwright/test'
import 'dotenv/config';

test('Google login', async ({ page }) => {
  await page.goto('https://stackoverflow.com/users/login')

  await page.getByRole('button', { name: 'Log in with Google' }).click()
  await page.getByLabel('Email or phone').fill("buyerdev99@gmail.com")
  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByLabel('Enter your password').fill("Treeboa@123")
  await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Accept all cookies' }).click();

})