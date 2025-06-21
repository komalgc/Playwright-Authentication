// playwright/fixtures/authToken.fixture.ts
import { test as base } from '@playwright/test';
import { request } from '@playwright/test';
import 'dotenv/config';

type UserType = 'admin' | 'user';

type AuthFixtures = {
  getAuthToken: (userType: UserType) => Promise<string>;
};

export const test = base.extend<AuthFixtures>({
  getAuthToken: async ({}, use) => {
    const getToken = async (userType: UserType): Promise<string> => {
      const BASE_URL = 'https://bookcart.azurewebsites.net';

      const creds = {
        admin: {
          username: process.env.ADMIN_USER,
          password: process.env.ADMIN_PASS,
        },
        user: {
          username: process.env.READER_USER,
          password: process.env.READER_PASS,
        },
      }[userType];

      const apiContext = await request.newContext();
      const loginRes = await apiContext.post(`${BASE_URL}/api/login`, {
        data: creds,
      });

      if (!loginRes.ok()) throw new Error(`❌ Login failed for ${userType}`);
      const body = await loginRes.json();
      return body.token;
    };

    await use(getToken);
  },
});
