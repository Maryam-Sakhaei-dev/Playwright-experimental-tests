import { test, expect, Locator } from "@playwright/test";
test("Coparing methods", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  const products: Locator = page.locator(".product-title");
  //1) innerText VS textContent
  //console.log(await products.nth(0).innerText());
  //console.log(await products.nth(0).textContent());
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const productName: string | null = await products.nth(i).textContent();
    //console.log(productName?.trim());
  }

  //2)
  const productName: string[] = await products.allTextContents();
  //console.log("Product names by allTextcontent:",productName);

  const productNameTrimmed: string[] = await productName.map((text) =>
    text.trim(),
  );
  console.log("Product names by allTextcontent:", productNameTrimmed);
});
