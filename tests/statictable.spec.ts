import { test, expect, Locator } from "@playwright/test";
test("Static Web Table", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table: Locator = page.locator("table[name='BookTable'] tbody");
  await expect(table).toBeVisible();
  //1. count number of Rows
  const rows: Locator = page.locator("table[name='BookTable'] tbody tr");
  await expect(rows).toHaveCount(7);

  //2. Count number of column OR Headers
  const columns: Locator = page.locator("table[name='BookTable'] tbody tr th");
  const columnsCount: number = await columns.count();
  console.log("Number of columns:", columnsCount);
  //3. Read all Data from 2nd row
  const textsrows: Locator = page.locator("table[name='BookTable'] tbody tr");
  const secondRowCell: Locator = textsrows.nth(2).locator("td");
  const allTexts = await secondRowCell.allInnerTexts();
  //console.log(allTexts);
  for (let text of allTexts) {
    console.log(text);
  }
  //4. Read all data from Table
  const allRowDatas = await rows.all();
  for (let row of allRowDatas.slice(1)) {
    const cell = await row.locator("td").allInnerTexts();
    console.log(cell.join("\t"));
  }

  //5.Print Book name where author is Mukesh
  for (let row of allRowDatas.slice(1)) {
    const cells = await row.locator("td").allInnerTexts();
    const author = cells[1];
    const book = cells[0];
    if (author === "Mukesh") {
      console.log(`${author}\t ${book}`);
    }
  }
  //6. Calculate total price of all books
  let totalprice:number=0;
  for(let row of allRowDatas.slice(1)){
    const cells=await row.locator('td').allInnerTexts();
    const price= cells[3];
    totalprice=totalprice+parseInt(price);
  }
  console.log(totalprice);
});
