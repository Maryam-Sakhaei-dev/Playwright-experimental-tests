import { test, expect } from "@playwright/test";
test("Autowaiting and Forcing", async ({ page }) => {
  test.setTimeout(30000);
  await page.goto("https://demowebshop.tricentis.com/");
  //Assertion - Auto wait works
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/", {
    timeout: 10000,
  });
  await expect(page.locator("text=Welcome to our store")).toBeVisible({
    timeout: 1000,
  });

  //Action
  await page.locator("#small-searchterms").fill("Laptop", { force: true });
  await page.locator(".button-1.search-box-button").click({ force: true });
});
