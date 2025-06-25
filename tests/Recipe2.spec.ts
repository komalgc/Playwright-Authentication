import { test } from "../playwright/fixture";
import { expect } from '@playwright/test'

// 👩‍💼👩‍💻 💻🔐🔐 Authenticate for multiple accounts once via the UI and 
// reuse the login storage state
//When to use:
//Your tests modify shared server-side state. For example, one test checks the rendering of the settings page, while the other test is changing the setting.



let bookscount;
test('first test account 1', async ({ page }) => {

  // Navigate to the login page
  await page.goto('https://bookcart.azurewebsites.net/');
  let rawText = await page.getByText('account_circlearrow_drop_down').textContent();
  const username = rawText ? rawText.split(' ').pop()?.trim() : '';

  //Verify the user is logged in
  console.log('The logged in User is ' + username);

  //go to the wishlist page
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await page.waitForURL("https://bookcart.azurewebsites.net/wishlist");
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');

  //Verify the wishlist page is not empty
  bookscount = await page.locator('tr').count();
  const actualcount = bookscount - 1;
  console.log('The no of books in wishlist is ' + actualcount);

})
test("second test account 2", async ({ page }) => {

  // Navigate to the login page
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.waitForURL("https://bookcart.azurewebsites.net/");


  let rawText = await page.getByText('account_circlearrow_drop_down').textContent();
  const username = rawText ? rawText.split(' ').pop()?.trim() : '';

  //Verify the user is logged in
  console.log('The logged in User is ' + username);

  //Verify the wishlist page is  empty
  await page.getByRole('button').filter({ hasText: 'favorite' }).click();
  await page.waitForURL("https://bookcart.azurewebsites.net/wishlist");
  await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');
  await expect(page.getByText('Your wishlist is empty.')).toBeVisible();
  console.log('Your wishlist is empty.');

});

