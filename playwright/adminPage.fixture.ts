// playwright/fixtures/browserWithToken.fixture.ts
import { test as base, Page, chromium } from '@playwright/test';
import { test as tokenTest } from './authToken.fixture'; // import token fixture
import 'dotenv/config';

/**
 * ┌────────────────────────────────────────────────────────────┐
 * │   authPage.fixture.ts (Extends token fixture)              │
 * └────────────────────────────────────────────────────────────┘
 *                   │
 *                   ▼
 *   Launches browser, creates new context  
 *                   │
 *                   ▼
 *   Navigates to app URL and sets `authToken` in localStorage
 *                   │
 *                   ▼
 *   Reloads page to simulate logged-in state
 *                   │
 *                   ▼
 *   Saves storage state to file ➝ `.auth/admin.json` 
 *   Returns authenticated `page` for use in tests
 *

 **/

const BASE_URL = 'https://bookcart.azurewebsites.net';
const adminFile = 'playwright/.auth/admin2.json';

type PageFixture = {
  adminPage: Page;
};

export const test = tokenTest.extend<PageFixture>({
  // Use the authToken fixture to create a new fixture for adminPage
  adminPage: async ({ authToken }, use) => {
    const BASE_URL = 'https://bookcart.azurewebsites.net';
    const adminFile = 'playwright/.auth/admin2.json';

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(BASE_URL);

    // Set the authToken in localStorage
    await page.evaluate((tk) => {
      localStorage.setItem('authToken', tk);
    }, authToken);

    await page.reload();
    await context.storageState({ path: adminFile });

    console.log('✅ Storage state saved to:', adminFile);

    // Use the page with the authToken set

    await use(page);
    await browser.close();
  },
});



/*export const test = base.extend<{browserWithTokenContext: import('playwright').Page;}>({

  browserWithTokenContext: async ({}, use, testInfo) => {
    // Use the authToken fixture directly by extending from authTest
    await authTest.extend<{ browserWithTokenContext: import('playwright').Page }>({
      browserWithTokenContext: async ({ authToken }, use) => {
        const token: string = authToken;

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(BASE_URL);

        await page.evaluate(token => {
          localStorage.setItem('authToken', token);  // adjust if actual key is different
        }, token);

        await page.reload();
        await context.storageState({ path: adminFile });
        console.log("✅ Saved storage state:", adminFile);

        await browser.close();
        await use(page);
      },
    });

  }
});*/