import { test as setstorage, expect, request, chromium } from "@playwright/test";
import fs from "fs";
import 'dotenv/config';



const ADMIN_STATE = 'playwright/.auth/apilogin.json';


const adminFile = "playwright/.auth/apilogin.json";
const BASE_URL = "https://rahulshettyacademy.com";

setstorage("Generate admin storage state", async () => {
  const apiContext = await request.newContext();

  // Step 1: Get token via API login
  const loginRes = await apiContext.post(`${BASE_URL}/api/ecom/auth/login`, {
    data: {
      userEmail: process.env.CRAPI_USER1,
      userPassword: process.env.CRAPI_PASS1
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


   // Set EXACT key the app reads
   await page.addInitScript(t => localStorage.setItem('token', t as string), token);
  // Step 3: Go to base URL
  await page.goto(BASE_URL);

  // Step 4: Set token into localStorage
  await page.evaluate((token) => {
    localStorage.setItem("token", token);
  }, token);

  // Step 5: Reload to simulate logged-in user flow
  await page.reload();

  // Step 6: Save storage state
  await context.storageState({ path: adminFile });
  await browser.close();


});


