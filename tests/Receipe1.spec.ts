import {test, expect} from '@playwright/test';


test('logintest', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/login');
    await page.getByPlaceholder('Username').fill('komalgc');
    await page.getByPlaceholder('Password').fill('Treeboa@123');
    await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
    await page.waitForURL("https://bookcart.azurewebsites.net/");
    await page.context().storageState({ path: "playwright/.auth.json" });

})


test.use({ storageState: 'playwright/.auth.json' });
test ('Homepage test', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/');
    await expect(page.getByText('komalgc')).toBeVisible();

})

