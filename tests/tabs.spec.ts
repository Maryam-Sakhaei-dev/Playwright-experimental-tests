import { test, expect, Locator, chromium, Page } from "@playwright/test";
test("Handel Tabs", async ({}) => {
  const browser = await chromium.launch(); //create browser
  const context = await browser.newContext(); //create context

  //Creating pages
  const parentPage = await context.newPage();
  await parentPage.goto("https://testautomationpractice.blogspot.com/");

  //2statment should go paralley
  const [childPage] = await Promise.all([
    context.waitForEvent("page"),
    parentPage.locator("button:has-text('New Tab')").click(),
  ]);
  //context.waitForEvent("page");  //pending,fulfilled,rejected
  //parentPage.locator("button:has-text('New Tab')").click();

  //Approach 1: switch between pages and titles
  const pages = context.pages(); //return an array
  console.log("Number of pages:", pages.length);
  console.log("title of  the parent page:", await pages[0].title());
  console.log("title of  the child page:", await pages[1].title());
});
