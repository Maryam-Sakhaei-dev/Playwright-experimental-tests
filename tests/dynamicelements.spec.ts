import { test, expect, Locator } from "@playwright/test";

test("Handle Dynamic Elements using XPath", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  for (let i = 1; i <= 5; i++) {
    const button: Locator = page.locator(
      '//button[text()="STOP" or text()="START"]',
    );

    await button.click();
    await page.waitForTimeout(2000);
  }
});

// using CSS
test("Handle Dynamic Elements using CSS", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  for (let i = 1; i <= 5; i++) {
    const button: Locator = page.locator(
      'button[name="start"], button[name="stop"]',
    );
    console.log(` Loop started ${i} `);
    await button.click();
    console.log(`Click Succ${i}`);
    await page.waitForTimeout(2000);
  }
});

//Using playwright specific locators
test("Handle Dynamic Elements using Locators", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  for (let i = 1; i <= 5; i++) {
    const button = page.getByRole("button", { name: /START|STOP/ });

    await button.click();
    await page.waitForTimeout(2000);
  }
});
