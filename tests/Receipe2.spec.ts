import { test } from "../playwright/fixture";

test("first test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.waitForURL("https://bookcart.azurewebsites.net/");
  //continue with any user journey like adding books to cart or wishlist and make assertions
  //If the test runs under worker 1, it will be performed as 'swathika' as the auth0.json  will be saved with storage state for 'swathika'
  });