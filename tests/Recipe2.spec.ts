import { test } from "../playwright/fixture";
import { expect } from '@playwright/test'

const BASE_URL = process.env.CRAPI_BASE_URL ?? 'http://localhost:8888';

let bookscount;

test('first test account 1', async ({ page }) => {

  // Navigate to the login page
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  const username1 = await page.locator('.user-name').textContent();
  //const username = rawText ? rawText.split(' ').pop()?.trim() : '';

  //Verify the user is logged in
  console.log('The logged in User is ' + username1);

  //verify vehicle details

  await await expect(page.getByRole('cell', { name: 'Hyundai' })).toBeHidden();
 
})
test("second test account 2", async ({ page }) => {

  // Navigate to the login page
   await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  const username2 = await page.locator('.user-name').textContent();
  //const username = rawText ? rawText.split(' ').pop()?.trim() : '';

  //Verify the user is logged in
  console.log('The logged in User is ' + username2);

  
  //Verify the wishlist page is  empty
   await await expect(page.getByRole('cell', { name: 'Hyundai' })).toBeHidden();
});

