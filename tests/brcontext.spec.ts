import { test, expect, Page, chromium } from "@playwright/test";
//Browser ---> Context---->pages
//Browser ---> Chromium, Firbox, Webkit
//Contexts ---> we  can have multiple contexts for multiple users/apps for the same browser
//Page---> New tab, Window,
// To Do flaky
test.skip("Browser context demo", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");
  //Creating pages
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  await page1.goto("https://playwright.dev/");
  await expect(page1).toHaveTitle(
    "Fast and reliable end-to-end testing for modern web apps | Playwright",
  );

  await page2.goto("https://www.selenium.dev/");
  await expect(page2).toHaveTitle("Selenium");
  await page1.waitForTimeout(5000);
  await page2.waitForTimeout(5000);
});
