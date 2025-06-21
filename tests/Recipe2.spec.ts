import { test } from "../playwright/fixture";
import { expect } from '@playwright/test'

// 👩‍💼👩‍💻 💻🔐🔐 Authenticate for multiple accounts once via the UI and 
// reuse the login storage state


let bookscount;
test.only('first test account 1', async ({ page }) => {

  await page.goto('https://bookcart.azurewebsites.net/');
  let rawText = await page.getByText('account_circlearrow_drop_down').textContent();
  const username = rawText ? rawText.split(' ').pop()?.trim() : '';
  console.log('The logged in User is ' + username);
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');

  bookscount = await page.locator('tr').count();
  const actualcount = bookscount - 1;
  console.log('The no of books in wishlist is ' +actualcount);

})
test("second test account 2", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.waitForURL("https://bookcart.azurewebsites.net/");
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');
  await expect(page.getByText('Your wishlist is empty.')).toBeVisible();

});

