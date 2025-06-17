import {test, expect} from '@playwright/test'


test.use({ storageState: 'playwright/.auth.json' });
test ('Homepage test', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/');
    await expect(page.getByText('komalgc')).toBeVisible();
 
    await page.getByRole('button').filter({ hasText: 'favorite' }).click();
   
    await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');


})