// tests/recipe4.spec.ts
import { test} from '../playwright/multAuthPage.fixture';
import { expect} from '@playwright/test';

// 👩‍💼👩‍💻 📟🔐🔐 Authenticate for multiple accounts via the API and use
// them in single test
//When to use
//You need to test how multiple authenticated roles interact together, in a single test.



test.only('Admin and User should access their respective pages', async ({ getPageWithAuth }) => {
  // Authenticate and get pages
  const adminPage = await getPageWithAuth('admin');
  const userPage = await getPageWithAuth('user');

  // Admin flow
  await adminPage.goto('https://bookcart.azurewebsites.net/myorders');
  await expect(adminPage.getByRole("columnheader", { name: "Order ID" })).toBeVisible();
    const rawText1 = await userPage.getByText('account_circlearrow_drop_down').textContent();
  const username1 = rawText1 ? rawText1.split(' ').pop()?.trim() : '';
  console.log('The logged in User is ' + username1);

  // User flow
  await userPage.goto('https://bookcart.azurewebsites.net/myorders');
   await expect(adminPage.getByRole("columnheader", { name: "Order ID" })).toBeVisible();
  const rawText2 = await userPage.getByText('account_circlearrow_drop_down').textContent();
  const username2 = rawText2 ? rawText2.split(' ').pop()?.trim() : '';
  console.log('The logged in User is ' + username2);
});


