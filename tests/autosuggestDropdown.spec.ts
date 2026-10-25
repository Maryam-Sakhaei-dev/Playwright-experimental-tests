import { test, expect, Locator } from "@playwright/test";
test("Autosugest dropsown", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await page.locator("input[name='q']").first().fill("smart");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "debug-screenshot.png", fullPage: true });
  //Get all the Sugested options --> ctrl+shift+P on DOM-->emulate focused page
  const options: Locator = page.locator("ul>li");
  const count = await options.count();
  console.log("Nummber of Sugestions:", count);
  //console.log("5 th option:", await options.nth(5).innerText());
  //printing all the suggesed option in the console
  for (let i = 0; i < count; i++) {
    console.log("5 th option:", await options.nth(5).innerText());
  }
  //Selct/Click on the smartphone option
  for(let i=0; i<count; i++){
    const text= await options.nth(i).innerText();
    if(text === 'smartphone'){
      options.nth(i).click();
      break;
    }
  }
});
