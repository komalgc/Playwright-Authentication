// tests/recipe4.spec.ts
import { test} from '../playwright/multAuthPage.fixture';
import { expect} from '@playwright/test';

// 👩‍💼👩‍💻 📟🔐🔐 Authenticate for multiple accounts once via the API and 
// reuse the login storage state
//When to use
//You have more than one role in your end to end tests, but you can reuse accounts across all tests.


/**
 
 *
 * Goal: Use API login to authenticate different roles (e.g., admin, user),
 * save their sessions to storage files, and reuse them across tests.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │         Fixture: worker scoped fixture (auth via API)       │
 * └─────────────────────────────────────────────────────────────┘
 *         │
 *         ▼
 *   1️. Identify parallel worker ➝ `parallelIndex`
 *         │
 *   2️. Map worker ID to test credentials:
 *        - index 0 → username0 / password0
 *        - index 1 → username1 / password1
 *         │
 *   3️. Login via API: POST /api/login
 *         │
 *   4️. Inject token into browser's localStorage
 *         │
 *   5️. Reload and simulate logged-in state
 *         │
 *   6️. Save s*
**/

test('Admin user sees order page', async ({ getPageWithAuth }) => {
  //
  const page = await getPageWithAuth('admin');
  await page.goto('https://bookcart.azurewebsites.net/myorders');
  await expect(page.getByRole("columnheader", { name: "Order ID" })).toBeVisible();
  let rawText = await page.getByText('account_circlearrow_drop_down').textContent();
  const username = rawText ? rawText.split(' ').pop()?.trim() : '';
  console.log('The logged in User is ' + username);


  
});

test('Reader user sees homepage', async ({ getPageWithAuth }) => {
  const page = await getPageWithAuth('user');
  await page.goto('https://bookcart.azurewebsites.net/myorders');
   let rawText = await page.getByText('account_circlearrow_drop_down').textContent();
  const username = rawText ? rawText.split(' ').pop()?.trim() : '';
  console.log('The logged in User is ' + username);

});
