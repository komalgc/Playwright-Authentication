import { test as baseTest, expect } from "@playwright/test";
export * from "@playwright/test";
import fs from "fs";
import 'dotenv/config';


let account: { username: any; password: any };
// Define a function to return account credentials based on the ID
async function acquireAccount(id: number) {

  // You can have a list of pre-created accounts for testing.
  if (id === 0) {
    account = {
      username: process.env.username0,
      password: process.env.password0,
    };
  } else if (id === 1) {
    account = {
      username: process.env.username1,
      password: process.env.password1,
    };
  }
  return account;
}

export const test = baseTest.extend<{}, { workerStorageState: string }>({

  // Define a fixture to provide the page object with authentication state.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  // This fixture will be used to authenticate the user and store the state.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = `playwright/.auth${id}.json`;

      if (fs.existsSync(fileName)) {

        await use(fileName);
        return;
      }

      const page = await browser.newPage({ storageState: undefined });
      account = await acquireAccount(id);

      await page.goto("https://bookcart.azurewebsites.net/");
      await page.getByRole("button", { name: " Login " }).click();
      await page.getByLabel("Username").fill(account.username);
      await page.getByLabel("Password").fill(account.password);
      await page.locator("mat-card-actions").getByRole("button", { name: "Login" }).click();
      await page.waitForURL("https://bookcart.azurewebsites.net/");

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});  
