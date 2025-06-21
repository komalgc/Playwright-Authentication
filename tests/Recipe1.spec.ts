import {test, expect} from '@playwright/test';
import 'dotenv/config';

// 👩‍💼💻🔐 Authenticate once via the UI and reuse the login storage state
test('logintest', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/login');
    await page.getByPlaceholder('Username').fill(process.env.username0 ?? "");
    await page.getByPlaceholder('Password').fill(process.env.password0 ?? "");
    await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
    await page.waitForURL("https://bookcart.azurewebsites.net/");
    await page.context().storageState({ path: "playwright/.auth.json" });

})

test.use({ storageState: 'playwright/.auth.json' });
test ('Homepage test', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/');
    await expect(page.getByText('Login')).toBeHidden();

})

