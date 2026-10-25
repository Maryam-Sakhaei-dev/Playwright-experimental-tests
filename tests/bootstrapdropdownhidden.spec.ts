import { test, expect, Locator } from "@playwright/test";
test("Bootstrap Hidden Dropdpwn", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  //Login Step
  await page.locator('input[name="username"]').fill("Admin");
  await page.locator('input[name="password"]').fill("admin123");
  await page.locator('button[type="submit"]').click();
  //Click on the PIM
  await page.getByText("PIM").click();
  // click on the dropdown
  await page.locator("form i").nth(2).click();
  await page.waitForTimeout(5000);
  //capture all the optiond from dropdown
  const options: Locator = await page.locator("div[role='listbox'] span");
  const count: number = await options.count();
  console.log("nummber of optiond dropdown", count);
  //print all options
  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();
    //console.log("dropdownText:", text);
    if (text === "Account Assistant") {
      await options.nth(i).click();
      break;
    }
  }
  await page.waitForTimeout(5000);
});
