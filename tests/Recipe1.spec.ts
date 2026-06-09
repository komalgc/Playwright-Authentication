import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import 'dotenv/config';

const BASE_URL = process.env.CRAPI_BASE_URL ?? 'http://localhost:8888';
const AUTH_FILE = 'playwright/.auth/user.json';

test.describe.configure({ mode: 'serial' }); // ensure order

test('login: create storage state', async ({context, page }) => {

    // Clear any stray data in case the app caches aggressively
    await context.clearCookies();
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  // 1) Go to login
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });

  // 2) Fill credentials (check your placeholders/labels match the page)
  await page.getByPlaceholder('Email').fill(process.env.CRAPI_USER0 ?? '');
  await page.getByPlaceholder('Password').fill(process.env.CRAPI_PASS0 ?? '');

  // 3) Click Login and wait for redirect to dashboard (allow querystrings)
  await Promise.all([
    page.waitForURL(/\/dashboard(\?|$)/, { timeout: 15_000 }),
    page.locator('#basic').getByRole('button', { name: 'Login' }).click(),
  ]);

  // 4) Ensure folder exists, then persist auth
  await fs.mkdir('playwright/.auth', { recursive: true });
  await page.context().storageState({ path: AUTH_FILE });
});

// All tests after this will reuse the saved state
test.use({ storageState: AUTH_FILE });

test('Homepage test', async ({ page }) => {
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.avatarContainer')).toBeVisible();
});
