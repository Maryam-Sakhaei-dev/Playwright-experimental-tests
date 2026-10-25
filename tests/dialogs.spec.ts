import { test, expect, Page, Locator } from "@playwright/test";
test("Alert Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on("dialog", (dialog) => {
    console.log(dialog.type());
    expect(dialog.type()).toContain("alert");
    console.log(dialog.message());
    expect(dialog.message()).toContain("I am an alert box ");
    dialog.accept();
  });

  await page.locator("#alertBtn").click(); //open dialogs
  await page.waitForTimeout(5000);
});
test("Confirm Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on("dialog", (dialog) => {
    console.log("Dialog Type is:", dialog.type());
    expect(dialog.type()).toContain("confirm");
    console.log("Dialog Text:", dialog.message());
    expect(dialog.message()).toContain("Press a button!");
    dialog.accept();
  });

  await page.locator("#confirmBtn").click(); //open dialogs
  await page.waitForTimeout(5000);
});
test.only("Prompt Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on("dialog", (dialog) => {
    console.log("Dialog Type is:", dialog.type());
    expect(dialog.type()).toContain("prompt");
    console.log("Dialog Text:", dialog.message());
    expect(dialog.message()).toContain("Please enter your name:");
    expect(dialog.defaultValue()).toContain("Harry Potter");
    dialog.accept("MARYAM");
  });

  await page.locator("#promptBtn").click(); //open dialogs
  const textPrompt = await page.locator("#demo").innerText();
  console.log("outputText:", textPrompt);
  await expect(page.locator("#demo")).toHaveText(
    "Hello MARYAM! How are you today?",
  );
});
