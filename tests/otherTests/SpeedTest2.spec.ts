import { test, expect } from '@playwright/test';
import 'dotenv/config';


let bookscount;
test('Homepage test', async ({ page }) => {

  await page.goto('https://bookcart.azurewebsites.net/login');
  await page.getByPlaceholder('Username').fill(process.env.username0 ?? "");
  await page.getByPlaceholder('Password').fill(process.env.password0 ?? "");
  await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
  await expect(page.getByText('komalgc')).toBeVisible();


})

test('Wishlist test', async ({ page }) => {

  await page.goto('https://bookcart.azurewebsites.net/login');
  await page.getByPlaceholder('Username').fill(process.env.username0 ?? "");
  await page.getByPlaceholder('Password').fill(process.env.password0 ?? "");
  await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
  await expect(page.getByText('komalgc')).toBeVisible();
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');
  bookscount = await page.locator('tr').count();
  const actualcount = bookscount - 1;
  console.log(actualcount);

})

test('Checkoutpage test', async ({ page }) => {
  await page.goto('https://bookcart.azurewebsites.net/login');
  await page.getByPlaceholder('Username').fill(process.env.username0 ?? "");
  await page.getByPlaceholder('Password').fill(process.env.password0 ?? "");
  await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
  await expect(page.getByText('komalgc')).toBeVisible();

  await page.goto('https://bookcart.azurewebsites.net/shopping-cart');
  await page.getByRole('button', { name: 'CheckOut' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/checkout');

})
