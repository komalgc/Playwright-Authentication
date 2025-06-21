import {test, expect} from '@playwright/test'

let bookscount ;


test.use({ storageState: 'playwright/.auth.json' });
test ('Wishlist test', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/');
    await expect(page.getByText('komalgc')).toBeVisible();
 
    await page.getByRole('button').filter({ hasText: 'favorite' }).click();
   
    await expect(page).toHaveURL('https://bookcart.azurewebsites.net/wishlist');

    bookscount = await page.locator('tr').count(); 
    const actualcount = bookscount - 1;

    console.log(actualcount);



})