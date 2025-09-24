import { test as baseTest, expect } from "@playwright/test";
export * from "@playwright/test";
import fs from "fs";
import fsp from "fs/promises";
import "dotenv/config";

type Account = { username: string; password: string };

// ---- crAPI defaults (override via .env if you like) ----
const BASE_URL   = process.env.CRAPI_BASE_URL  ?? "http://localhost:8888";
const LOGIN_PATH = process.env.CRAPI_LOGIN_PATH ?? "/login";
const DASH_PATH  = process.env.CRAPI_DASH_PATH  ?? "/dashboard";

// Map worker → creds. Falls back to CRAPI_USER/CRAPI_PASS if CRAPI_USER{n}/CRAPI_PASS{n} not set.
async function acquireAccount(id: number): Promise<Account> {
  const username =
    process.env[`CRAPI_USER${id}`] ??
    process.env.CRAPI_USER ??
    "";
  const password =
    process.env[`CRAPI_PASS${id}`] ??
    process.env.CRAPI_PASS ??
    "";
  return { username, password };
}

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Every test in this worker gets the same storageState file
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      // One auth file per worker: .auth0.json, .auth1.json, ...
      const id = baseTest.info().parallelIndex;
      const fileName = `playwright/.auth${id}.json`;

      if (fs.existsSync(fileName)) {
        console.log(`[worker ${id}] Reusing storageState: ${fileName}`);
        await use(fileName);
        return;
      }

      // Fresh context; no prior cookies/localStorage
      const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
      const page = await context.newPage();

      const account = await acquireAccount(id);
      if (!account.username || !account.password) {
        throw new Error(
          `Missing creds for worker ${id}. Set CRAPI_USER${id}/CRAPI_PASS${id} or CRAPI_USER/CRAPI_PASS in .env`
        );
      }

      // ---- Recipe 1 login flow (UI) ----
      // Clear any stray site data (belt & suspenders)
      await context.clearCookies();
      await page.addInitScript(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      // 1) Go to /login
      await page.goto(`${BASE_URL}${LOGIN_PATH}`, { waitUntil: "domcontentloaded" });

      // 2) Fill and submit (crAPI selectors)
      await page.getByPlaceholder("Email").fill(account.username);
      await page.getByPlaceholder("Password").fill(account.password);

      await Promise.all([
        page.waitForURL(new RegExp(`${DASH_PATH.replace(/\//g, "\\/")}(\\?|$)`), { timeout: 15_000 }),
        page.locator("#basic").getByRole("button", { name: /login/i }).click(),
      ]);

      // Optional sanity: dashboard visible token element
      // await expect(page.locator(".avatarContainer")).toBeVisible();

      // 3) Persist storageState for this worker
      await fsp.mkdir("playwright", { recursive: true });
      await context.storageState({ path: fileName });
      console.log(`[worker ${id}] storageState saved: ${fileName}`);

      await context.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
