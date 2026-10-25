import { test, expect, Locator } from "@playwright/test";
test("Locator", async ({ page }) => {
  //await page.goto("https://demo.nopcommerce.com/");
  //1
  //console.log(await page.title());
  //2
  //const logo = page.getByAltText("Icon for demo.nopcommerce.com");
  //await expect(logo).toBeVisible();
  //3
  //await page.goto(
  //"https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  //);
  //page.locator("getByPlaceholder() Locators");
  //await expect(
  //page.getByRole("heading", { name: "getByPlaceholder() Locators" }),
  //).toBeVisible();
  //await page.getByPlaceholder("Enter your full name").fill("Maryam");
  //await page.getByPlaceholder("Phone number (xxx-xxx-xxxx)").fill("123456789");
  //await page
  //.getByPlaceholder("Type your message here...")
  //.fill("hello,I am learning typescript with playwright");
  //await page.getByPlaceholder("Search products...").fill("Playwright Course");
  //4
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  );
  //await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");
  5; //
  await expect(page.getByTestId("profile-name")).toHaveText("John Doe");
  await expect(page.getByTestId("profile-email")).toHaveText(
    "john.doe@example.com",
  );
});
