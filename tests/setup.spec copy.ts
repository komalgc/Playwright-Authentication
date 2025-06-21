import { test as setup, expect, chromium } from "@playwright/test";
import 'dotenv/config';

const adminFile = "playwright/.auth/admin.json";

setup("authenticate as admin", async ({ request }) => {
  const loginRes = await request.post(
    "https://bookcart.azurewebsites.net/api/login",
    { data: { username: process.env.ADMIN_USER, password: process.env.ADMIN_PASS } }
  );
  expect(loginRes.ok()).toBeTruthy();
  const json = await loginRes.json();
  const token = json.token;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Go to app
  await page.goto("https://bookcart.azurewebsites.net");

  // 2. Inject token into localStorage
  await page.evaluate((token) => {
    window.localStorage.setItem("token", token);
  }, token);

  // 3. Reload to trigger login session establishment
  await page.reload();
  await request.storageState({ path: adminFile });
  await browser.close();});

/*setup("authenticate as reader", async ({ request }) => {
  const res = await request.post(
    "https://bookcart.azurewebsites.net/api/login",
    { data: { username: process.env.READER_USER, password: process.env.READER_PASS } }
  );
  expect(res.ok()).toBeTruthy();
  await request.storageState({ path: readerFile });
});*/
