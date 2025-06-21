// playwright/fixtures/authToken.fixture.ts
import { test as base, request, expect } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = 'https://bookcart.azurewebsites.net';

export const test = base.extend<{authToken: string;}>({
  authToken: async ({}, use) => {
    const apiContext = await request.newContext();
    const res = await apiContext.post(`${BASE_URL}/api/login`, {
      data: {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASS,
      },
    });

    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    console.log("✅ Token fetched:", json.token);
    await use(json.token);
  },
});
