import { test, expect, Locator } from "@playwright/test";
test("XPath Axes demo", async ({ page }) => {
  await page.goto("https://www.w3schools.com/html/html_tables.asp");
  //1. self
  const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
  // console.log(await germanyCell.count());
  await expect(germanyCell).toHaveText("Germany");

  //2. Parent
  const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
  await expect(parentRow).toContainText("Maria Anders");

  //3. child Axis
  const secondRowCells: Locator = page.locator(
    "//table[@id='customers']//tr[2]/child::td",
  );
  await expect(secondRowCells).toHaveCount(3);

  //4. ancestor
  const table: Locator = page.locator("//td[text()='Germany']/ancestor::table");
  await expect(table).toHaveAttribute("id", "customers");

  //5. descendant axis - Get all <td> elements under the table
  const allTds: Locator = page.locator(
    "//table[@id='customers']/descendant::td",
  );
  await expect(allTds).toHaveCount(18);

  //6. following axis - Get the <td> that comes after "GErmany" in document order
  const followingCell: Locator = page.locator(
    "//td[normalize-space()='Germany']/following::td[1]",
  );
  await expect(followingCell).toHaveText("Centro comercial Moctezuma");

  //7. following-sibling  axis
  const rightSiblings: Locator = page.locator(
    "//td[normalize-space()='Germany']/following-sibling::td",
  );
  await expect(followingCell).toHaveText("Centro comercial Moctezuma");
  await expect(rightSiblings).toHaveCount(0);

  // 8. preceding axis
  const precedingCell: Locator = page
    .locator("//td[text()='Germany']/preceding::td")
    .first();
  await expect(precedingCell).toHaveText("Alfreds Futterkiste");

  //9. preceding-sibling
  const leftSiblings: Locator = page.locator(
    "//td[text()='Germany']/preceding-sibling::td",
  );
  await expect(leftSiblings).toHaveCount(2);
  await expect(leftSiblings.nth(0)).toHaveText("Alfreds Futterkiste");
  await expect(leftSiblings.nth(1)).toHaveText("Maria Anders");
});
