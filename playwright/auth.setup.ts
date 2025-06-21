import { chromium, request } from '@playwright/test';
import fs from 'fs/promises';

export async function loginAndSaveStorageState(path = 'storageState.json') {
  const apiContext = await request.newContext();

  const loginPayload = {
    username: 'buyerdev',
    password: 'Treeboa@123',
  };

  const loginResponse = await apiContext.post(
    'https://bookcart.azurewebsites.net/api/login',
    { data: loginPayload }
  );

  const loginJson = await loginResponse.json();
  const token = loginJson.token;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://bookcart.azurewebsites.net');

  await page.evaluate((token) => {
    localStorage.setItem('token', token);
  }, token);

  await page.context().storageState({ path });

  await browser.close();
}