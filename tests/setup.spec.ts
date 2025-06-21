import { test as setup, expect, request, chromium } from "@playwright/test";
import fs from "fs";

const adminFile = "playwright/.auth/admin.json";
const BASE_URL = "https://bookcart.azurewebsites.net";

setup("Generate admin storage state", async () => {
  const apiContext = await request.newContext();

  // Step 1: Get token via API login
  const loginRes = await apiContext.post(`${BASE_URL}/api/login`, {
    data: {
      username: "buyerdev",
      password: "Treeboa@123",
    },
  });

  expect(loginRes.ok()).toBeTruthy();
  const json = await loginRes.json();
  const token = json.token;
  console.log("✅ Token:", token);

  // Step 2: Open browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 3: Go to base URL
  await page.goto(BASE_URL);

  // Step 4: Set token into localStorage
  await page.evaluate((token) => {
    localStorage.setItem("authToken", token);
  }, token);

  // Step 5: Reload to simulate logged-in user flow
  await page.reload();

  // Step 6: Wait for UI element that proves login worked


  // Step 7: Save storage state
  await context.storageState({ path: adminFile });
  await browser.close();

  // Debug
  const savedState = JSON.parse(fs.readFileSync(adminFile, "utf-8"));
  console.log("✅ Saved localStorage keys:", savedState.origins);

});
