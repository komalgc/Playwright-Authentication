import {test, expect} from '@playwright/test';
import 'dotenv/config';

// 👩‍💼💻🔐 Authenticate once via the UI and reuse the login storage state
//When to use:
//When all your tests running at the same time with the same account, without affecting each other.

/**
 * 🔐 Authenticate Once via UI ➝ Reuse Storage State Across Tests
 *
 * ┌────────────────────────────────────────────────────┐
 * │                First Test: logintest               │
 * └────────────────────────────────────────────────────┘
 *                   │
 *                   ▼
 *        Go to Login Page (UI-Based Authentication)
 *                   │
 *                   ▼
 *     Fill Username & Password from .env (.username0)
 *                   │
 *                   ▼
 *              Submit Login Form
 *                   │
 *                   ▼
 *        ✅ Logged In → Landing on Homepage
 *                   │
 *                   ▼
 *     Save Auth State ➝ `playwright/.auth.json`
 *     (includes cookies + localStorage)
 *
 * ┌────────────────────────────────────────────────────┐
 * │         Second Test: Reuse Saved Login             │
 * └────────────────────────────────────────────────────┘
 *                   │
 *                   ▼
 *       Load storageState: `.auth.json` into context
 *                   │
 *                   ▼
 *     Launch Authenticated Session → Go to Homepage
 *                   │
 *                   ▼
 *     ✅ Validate Logged-in UI (e.g. Username shown)
 * 
 * No need to log in again — Stable & Fast!
 */


test('logintest', async({page}) =>{

    //Navigate to the login page    
    await page.goto('https://bookcart.azurewebsites.net/login');
    await page.getByPlaceholder('Username').fill(process.env.username0 ?? "");
    await page.getByPlaceholder('Password').fill(process.env.password0 ?? "");
    await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
    await page.waitForURL("https://bookcart.azurewebsites.net/");
    // Save the authentication state to a file
    // This will save the cookies and local storage
    await page.context().storageState({ path: "playwright/.auth.json" });

})

// Reuse the authentication state in subsequent tests
test.use({ storageState: 'playwright/.auth.json' });
test('Homepage test', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/');
    await expect(page.getByText('account_circlearrow_drop_down')).toBeVisible();
      

})

