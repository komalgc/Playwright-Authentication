// playwright/fixtures/authPage.fixture.ts
import { test as base, chromium, Page } from '@playwright/test';
import { test as tokenTest } from './multAuthToken.fixture';
import fs from 'fs';
import path from 'path';

type UserType = 'admin' | 'user';

type AuthPageFixture = {
  getPageWithAuth: (userType: UserType) => Promise<Page>;
};

export const test = tokenTest.extend<AuthPageFixture>({
  getPageWithAuth: async ({ getAuthToken }, use) => {
    const getPage = async (userType: UserType): Promise<Page> => {
      const BASE_URL = 'https://bookcart.azurewebsites.net';
      const storagePath = `playwright/.auth/${userType}.json`;

      const token = await getAuthToken(userType);

      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(BASE_URL);
      await page.evaluate((tk) => {
        localStorage.setItem('authToken', tk);
      }, token);
      await page.reload();

      await context.storageState({ path: storagePath });
      console.log(`✅ Storage state saved: ${storagePath}`);

      return page;
    };

    await use(getPage);
  },
});
