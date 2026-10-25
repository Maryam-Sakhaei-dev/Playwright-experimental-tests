import { test, expect, Locator } from "@playwright/test";
test("Singel Select dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //1. select option from the dropdown (4 ways)
  await page.locator("#colors").selectOption(["red", "blue", "Green"]); //using visible text
  await page.locator("#colors").selectOption(["red", "green", "white"]); //using value attribute
  await page
    .locator("#colors")
    .selectOption([{ label: "Red" }, { label: "Green" }, { label: "Yellow" }]); //using label
  await page
    .locator("#colors")
    .selectOption([{ index: 0 }, { index: 1 }, { index: 2 }]); //using index

  //2 check number of options in the dropdown(count)

  const dropdownOptions: Locator = await page.locator("#colors>option");
  await expect(dropdownOptions).toHaveCount(7);

  //3. check on option present in the dropdown

  const optionsText: string[] = (await dropdownOptions.allTextContents()).map(
    (text) => text.trim(),
  );
  console.log(optionsText);
  expect(optionsText).toContain("Red");

  //4. printing options from the dropdown
  for(const option of optionsText){
    console.log(option);
  }
  await page.waitForTimeout(5000);
});
