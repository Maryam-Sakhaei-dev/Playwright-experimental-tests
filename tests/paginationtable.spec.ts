import { test, expect, Locator } from "@playwright/test";
test("Read data from all the table pages", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );
  let hasMorePages = true;

  while (hasMorePages) {
    const rows = await page.locator("#example tbody tr").all();
    for (let row of rows) {
      console.log(await row.innerText());
    }
    //button[aria-label='Next']
    //const nextButton:Locator=page.locator("button[aria-controls='example']:nth-child(9)");
    const nextButton: Locator = page.locator("button[aria-label='Next']");
    const isDisable = await nextButton.getAttribute("class");
    if (isDisable?.includes("disabled")) {
      hasMorePages = false;
    } else {
      await nextButton.click();
    }
  }
});

//Filtering
test("Filter the rows and check the rows count", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );
  const dropdown: Locator = await page.locator("#dt-length-0");
  await dropdown.selectOption({ label: "25" });
  const rows = await page.locator("#example tbody tr").all();

  expect(rows.length).toBe(25);
});

//ُSearch for specific Data
test.only("Search for the specific data in a table", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );
  const searchbox = await page.locator("#dt-search-0");
  await searchbox.fill("Thor Walton");
  await page.waitForTimeout(5000);
  const rows = await page.locator("#example tbody tr").all();
  // console.log(rows);
  if (rows.length >= 1) {
    for (let row of rows) {
      const text = await row.innerText();
      if (text.includes("Thor Walton")) {
        console.log("found"); 
        break;
      }
    }
  } else {
    console.log("Not found");
  }
});
