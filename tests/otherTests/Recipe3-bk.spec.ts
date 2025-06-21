import { test, expect, chromium } from '@playwright/test';
import { loginAndSaveStorageState } from '../playwright/auth.setup'; // Adjust the import path as necessary
import fs from 'fs';

test.beforeAll(async () => {
  if (!fs.existsSync('storageState.json')) {
    await loginAndSaveStorageState();
  }
});

test('authenticated order check using manual storage state', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: 'storageState.json', // 
  });

  const page = await context.newPage();

  await page.goto('https://bookcart.azurewebsites.net/myorders');



  const orderId = await page.locator('tbody tr').first().locator('td').nth(1).textContent();
  console.log('✅ Order ID:', orderId);

  await browser.close();
});