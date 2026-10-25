import { test, expect, Locator } from "@playwright/test";
test("Handel Popup", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");

  //Multiple Popup

  //page.waitForEvent("popup");
  //await page.locator("#PopUp").click();
  await Promise.all([
    page.waitForEvent("popup"),
    await page.locator("#PopUp").click(),
  ]);
  await expect.poll(() => context.pages().length).toBe(3);

  const allPopup = context.pages();
  console.log("number of pages:", allPopup.length);

  for (const testPopup of allPopup) {
    console.log(testPopup.url());
  }
});
