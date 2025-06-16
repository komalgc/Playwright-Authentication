import {test, expect} from '@playwright/test';

test('logintest', async({page}) =>{

    await page.goto('https://bookcart.azurewebsites.net/login');
    await page.getByPlaceholder('Username').fill('komalgc');
    await page.getByPlaceholder('Password').fill('Treeboa@123');
    await page.getByRole('button', {name : 'Login'}).nth(1).click();
    await page.waitForURL("https://bookcart.azurewebsites.net/");

 
  


})