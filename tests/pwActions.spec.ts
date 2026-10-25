import { test, expect, Locator } from "@playwright/test";

//Text Input/  Text Box/ Input Box
test("Text Input Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const textBox: Locator = page.locator("#name");
  await expect(textBox).toBeVisible();
  await expect(textBox).toBeEnabled();
  const maxLength: string | null = await textBox.getAttribute("maxlength"); //Returns value of maxlength attribute of the element
  expect(maxLength).toBe("15");
  await textBox.fill("Maryam Sakhaei");
  //console.log("text content of Firstname:", await textBox.textContent());//return Empty
  const enterValue: string = await textBox.inputValue();
  console.log("Input Value of the Firstname:", await textBox.inputValue()); //return input value of textbox
  expect(enterValue).toBe("Maryam Sakhaei");
});

//Radio Buttons
test("Radio Button Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const maleRadoi: Locator = page.locator("#male");
  await expect(maleRadoi).toBeVisible();
  await expect(maleRadoi).toBeEditable();
  expect(await maleRadoi.isChecked()).toBe(false);
  await maleRadoi.check(); //select radio button
  expect(await maleRadoi.isChecked()).toBe(true);
  await expect(maleRadoi).toBeChecked();
});

//
test("checkBox Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //1. select specific checkBox(Sunday) using get by lable and assert
  const sundayCheckbox: Locator = page.getByLabel("Sunday");
  //await sundayCheckbox.check();
  //await expect(sundayCheckbox).toBeChecked();

  //2. select all checkboxes(days of week) is checked
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const checkBoxes: Locator[] = days.map((index) => page.getByLabel(index));
  expect(checkBoxes.length).toBe(7);
  //3. Select all checkBoxes
  for (const checkBoxe of checkBoxes) {
    await checkBoxe.uncheck();
    await expect(checkBoxe).not.toBeChecked();
  }
  //4. uncheck last 3 checkboxes and assert

  for (const checkBoxe of checkBoxes.slice(-3)) {
    await checkBoxe.uncheck();
    await expect(checkBoxe).not.toBeChecked();
  }
  //5. Toggle checkboxes if checked , uncheck; if unchecked check
  for (const checkbox of checkBoxes) {
    if (await checkbox.isChecked()) {
      //only if not checked
      await checkbox.check();
      await expect(checkbox).not.toBeChecked();
    } else {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }
  //await page.waitForTimeout(5000);
  //7. Randomely select checkboxes
  const indexes: number[] = [1, 3, 6];
  for (const i of indexes) {
    await checkBoxes[i].check();
    await expect(checkBoxes[i]).toBeChecked();
  }
});
