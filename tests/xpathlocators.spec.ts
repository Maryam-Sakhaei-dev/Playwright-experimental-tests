import { test, expect, Locator } from "@playwright/test";
test("XPath demo in playwright", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  //1.Absolute xpath - logo
  const absolutlogo: Locator = page.locator(
    "xpath= /html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]",
  );
  await expect(absolutlogo).toBeVisible();
  //2.Relative xpath - logo
  const relativlogo: Locator = page.locator(
    "//img[contains(@alt, 'Demo Web Shop')]",
  );
  await expect(relativlogo).toBeVisible();

  //3. contains()
  const product: Locator = page.locator("//h2/a[contains(@href,'computer')]");
  const productCount: number = await product.count();
  console.log("Number of computer related products", productCount);
  expect(productCount).toBeGreaterThan(0);

  console.log(
    "First computer related product:",
    await product.first().textContent(),
  );
  console.log(
    "Last computer related product:",
    await product.last().textContent(),
  );
  console.log(
    "Nth computer related product:",
    await product.nth(3).textContent(),
  );
  let productTitles: string[] = await product.allTextContents(); //getting all the matched products in to an array
  for (let pt of productTitles) {
    console.log(pt);
  }

  //4. text
  const reglink: Locator = page.locator("//a[text()='Register']");
  await expect(reglink).toBeVisible();

  //5. get UL/LI
  const lastItem: Locator = page.locator(
    "//div[@class='column follow-us']//li[last()]",
  );
  await expect(lastItem).toBeVisible();
  console.log("last ITEM:", await lastItem.textContent);

  //6. Position
  const positionitem: Locator = page.locator(
    "//div[@class='column follow-us']//li[position()=3]",
  );
  await expect(positionitem).toBeVisible();
  console.log("positionitem:", await positionitem.textContent());
});
