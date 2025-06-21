import { test } from "../playwright/fixture";
import { expect } from '@playwright/test'

// 👩‍💼👩‍💻 💻🔐🔐 Authenticate for multiple accounts once via the UI and reuse the login storage state


let bookscount;
test('first test account 1', async ({ page }) => {

  await page.goto('https://bookcart.azurewebsites.net/');
  await expect(page.getByText('komalgc')).toBeVisible();
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');

  bookscount = await page.locator('tr').count();
  const actualcount = bookscount - 1;
  console.log(actualcount);

})
test("second test account 2", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.waitForURL("https://bookcart.azurewebsites.net/");
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');
  await expect(page.getByText('Your wishlist is empty.')).toBeVisible();

});

