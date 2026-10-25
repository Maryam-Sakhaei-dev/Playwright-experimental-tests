import { test, expect, Locator } from "@playwright/test";
// To Do flaky
test.skip("Verify chrome CPU load in dynamic table", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");
  const table: Locator = page.locator("table");
  await expect(table).toBeVisible();

  // select all the rows, then find number of rows

  const rows: Locator[] = await table.locator("tr").all();
  console.log("number of rows,rows.length");
  expect(rows).toHaveLength(5);
  //step  1:For Chrom get process
  let cpuLoad = "";
  for (const row of rows.slice(1)) {
    const processName: string = await row.locator("td").nth(0).innerText();
    if (processName === "Chrome") {
      //css syntax
      //const cpuLoad=row.locator("td:has-Text('%')").innerText();
      //Playwright syntax
      const cpuLoad = row.locator("td", { hasText: "%" }).innerText();
      await page.waitForTimeout(5000);
      //console.log(cpuLoad);
      break;
    }
  }
  await page.waitForTimeout(5000);
  //step2: compare it with value in the  yellow lable
  let yellowtext: string = await page.locator("#chrome-cpu").innerText();
  console.log(yellowtext);
  if (yellowtext.includes(cpuLoad)) {
    console.log("CPU load of chroum is equal");
  } else {
    console.log("CPU load of chroum is not equal");
  }
  await page.waitForTimeout(5000);
});
