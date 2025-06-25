// tests/recipe4.spec.ts
import { test} from '../playwright/multAuthPage.fixture';
import { expect} from '@playwright/test';

// 👩‍💼👩‍💻 📟🔐🔐 Authenticate for multiple accounts once via the API and 
// reuse the login storage state
//When to use
//You have more than one role in your end to end tests, but you can reuse accounts across all tests.


test('Admin user sees order page', async ({ getPageWithAuth }) => {
  //
  const page = await getPageWithAuth('admin');
  await page.goto('https://bookcart.azurewebsites.net/myorders');
  await expect(page.getByRole("columnheader", { name: "Order ID" })).toBeVisible();
  
});

test('Reader user sees homepage', async ({ getPageWithAuth }) => {
  const page = await getPageWithAuth('user');
  await page.goto('https://bookcart.azurewebsites.net/myorders');
   let rawText = await page.getByText('account_circlearrow_drop_down').textContent();
  const username = rawText ? rawText.split(' ').pop()?.trim() : '';
  console.log('The logged in User is ' + username);

});
