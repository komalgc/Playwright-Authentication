import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Selective video recording in Playwright', async ({ browser }) => {
  // Step 1: Login in a temporary context
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://bookcart.azurewebsites.net/login');
  await page.getByPlaceholder('Username').fill('komalgc');
  await page.getByPlaceholder('Password').fill('Treeboa@123');
  await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
  await page.waitForURL("https://bookcart.azurewebsites.net/");

  // Save login state
  await context.storageState({ path: 'loggedInState.json' });
  await context.close();

  // Step 2: Use that state in a new context with video
  const videoContext = await browser.newContext({
    storageState: 'loggedInState.json',
    recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } },
  });

  const recordedPage = await videoContext.newPage();
  await recordedPage.goto('https://bookcart.azurewebsites.net/shopping-cart');
  await recordedPage.getByRole('button', { name: 'CheckOut' }).click();
  await expect(recordedPage).toHaveURL('https://bookcart.azurewebsites.net/checkout');

  // Optional: Print path to the saved video
  console.log('Video saved at:', await recordedPage.video()?.path());

  await videoContext.close();
});
