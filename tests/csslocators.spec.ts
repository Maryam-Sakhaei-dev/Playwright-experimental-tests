import { test, expect, Locator } from "@playwright/test";
test("Verify Css Locators", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  //tag # id
  await expect(page.locator("#small-searchterms")).toBeVisible();
  await page.locator("#small-searchterms").fill("T-shirt");

  //tag.class
  await page.locator("input.search-box-text").fill("T-Shirt");
  await page.locator(".search-box-text").fill("T-Shirt");

  //tag[attribute=value]
  await page.locator("input[name='q']").fill("T-Shirt");

  //tag.class[attribiute=value]
  // await page.locator("input.search-box-text[value='Search store']").fill("T-Shirt");
  await page.locator(".search-box-text[value='Search store']").fill("T-Shirt");

  //await page.waitForTimeout(5000);
});
