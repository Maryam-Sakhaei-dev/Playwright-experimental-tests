import { test, expect } from "@playwright/test";
/*
test("title", () => {

});
*/

test("verify page title", async ({ page }) => {
  await page.goto("https://automationpractice.techwithjatin.com/");
  let Url: string = await page.url();
  console.log("URL:", Url);
  await expect(page).toHaveURL(/automationpractice/);
});
