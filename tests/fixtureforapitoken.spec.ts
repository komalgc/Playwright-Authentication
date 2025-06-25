import { test as setstorage, expect, request, chromium } from "@playwright/test";
import fs from "fs";
import 'dotenv/config';

/**
 *  * ┌────────────────────────────────────────────────────────────┐
 * │          Script: setstorage() - Generate Auth Token         │
 * └────────────────────────────────────────────────────────────┘
 *                   │
 *                   ▼
 *   Step 1: Use `request.newContext()` to hit login API
 *                   │
 *                   ▼
 *        POST /api/login with ADMIN credentials
 *                   │
 *                   ▼
 *     ✅ Receive Token from Response ➝ `authToken`
 *                   │
 *                   ▼
 *   Step 2: Launch Headless Browser via Chromium
 *                   │
 *                   ▼
 *     Navigate to Base URL (`bookcart.azurewebsites.net`)
 *                   │
 *                   ▼
 *      Inject Token into `localStorage` via `page.evaluate()`
 *                   │
 *                   ▼
 *              Reload the page to apply login state
 *                   │
 *                   ▼
 *   Step 3: Save session to file ➝ `apilogin.json`
 * 
 * **/
 

const adminFile = "playwright/.auth/apilogin.json";
const BASE_URL = "https://bookcart.azurewebsites.net";

setstorage("Generate admin storage state", async () => {
  const apiContext = await request.newContext();

  // Step 1: Get token via API login
  const loginRes = await apiContext.post(`${BASE_URL}/api/login`, {
    data: {
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS
    },
  });

  // Check if the login was successful
  expect(loginRes.ok()).toBeTruthy();
  const json = await loginRes.json();
  // Ensure the response contains a token
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

  // Step 6: Save storage state
  await context.storageState({ path: adminFile });
  await browser.close();

  // Debug
  const savedState = JSON.parse(fs.readFileSync(adminFile, "utf-8"));
  console.log("✅ Saved localStorage keys:", savedState.origins);

});
