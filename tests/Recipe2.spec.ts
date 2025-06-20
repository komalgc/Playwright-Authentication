import { test } from "../playwright/fixture";
import { expect } from '@playwright/test'

//👩‍💼👩‍💻 Authenticate via the UI using different accounts and 
// use unique storage states across each parallel worker

let bookscount;
test('first test', async ({ page }) => {

  await page.goto('https://bookcart.azurewebsites.net/');
  await expect(page.getByText('komalgc')).toBeVisible();
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');

  bookscount = await page.locator('tr').count();
  const actualcount = bookscount - 1;
  console.log(actualcount);

})
test("second test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.waitForURL("https://bookcart.azurewebsites.net/");
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');
  await expect(page.getByText('Your wishlist is empty.')).toBeVisible();

});

