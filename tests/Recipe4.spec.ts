import { test, expect } from "@playwright/test";

test.use({ storageState: "playwright/.auth/admin.json" });

test("Admin sees orders page", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/myorders");
  await expect(page).toHaveURL(/myorders$/);
  await expect(page.getByPlaceholder("Start shopping")).toBeVisible();
  // ...additional admin-specific assertions...
});
