import { test, expect, Locator } from "@playwright/test";
test("Singel Select dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //1. select option from the dropdown (4 ways)

  // await page.locator("#country").selectOption('India');//visible text
  // await page.locator("#country").selectOption({value:'uk'});//by using value attribute
  //await page.locator("#country").selectOption({label:'India'});//by using label
  //await page.locator("#country").selectOption({ index: 3 }); //using index

  //2 check number of options in the dropdown(count)
  const dropdownOptions: Locator = await page.locator("#country>option");
  await expect(dropdownOptions).toHaveCount(10);

  //3. check on option present in the dropdown
  const optionsText: string[] = (await dropdownOptions.allTextContents()).map(
    (text) => text.trim(),
  );
  console.log(optionsText);
  expect(optionsText).toContain("Japan");

  //4. printing options from the dropdown
  for (const option of optionsText) {
    console.log(option);
  }
  await page.waitForTimeout(5000);
});
