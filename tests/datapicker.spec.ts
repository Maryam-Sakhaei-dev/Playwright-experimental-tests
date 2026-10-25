import { test, expect, Page, Locator } from "@playwright/test";
async function selectDate(
  targetYear: string,
  targetMonth: string,
  targetDate: string,
  page: Page,
  isFuture: boolean,
) {
  while (true) {
    const currentMonth = await page
      .locator(".ui-datepicker-month")
      .textContent();
    const currentYear = await page.locator(".ui-datepicker-year").textContent();
    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    }
    if (isFuture) {
      await page.locator(".ui-datepicker-next").click();
    } else {
      await page.locator(".ui-datepicker-prev").click();
    }
  }
  const allDates = await page.locator(".ui-datepicker-calendar td").all();
  for (let dt of allDates) {
    const dateText = await dt.innerText();
    if (dateText === targetDate) {
      await dt.click();
      break;
    }
  }
}
test.skip("JQuery datepicker", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const dateInput = page.locator("#datepicker");

  await expect(dateInput).toBeVisible();

  await dateInput.click();

  await expect(page.locator(".ui-datepicker")).toBeVisible();

  //Next
  const year = "2026";
  const month = "September";
  const date = "25";
  await selectDate(year, month, date, page, true);
  const expectDate = "09/25/2026";
  await expect(dateInput).toHaveValue(expectDate);
});
test.skip("Booking.com Data Picker", async ({ page }) => {
  await page.goto("https://www.booking.com/");
  await page.getByTestId("searchbox-dates-container").click();
  //Check in date selection
  let checkinYear: string = "2026";
  let checkinMonth: string = "September";
  let checkinDay: string = "27";
  //navigate through the calender to find the desired check-in month and year

  while (true) {
    const currentMonthYear = await page
      .locator("h3[id='bui-calendar-month-2026-8']")
      .nth(0)
      .innerText();
    const currentMonth = currentMonthYear.split(" ")[0]; //September
    const currentYear = currentMonthYear.split(" ")[1]; //2026
    if (currentMonth === checkinMonth && currentYear === checkinYear) {
      break;
    } else {
      await page.locator("button[aria-label='Next month']");
    }
  }
  const allDate = await page
    .locator("searchbox-datepicker-calendar")
    .first()
    .locator("td")
    .all();
  for (let date of allDate) {
    const dateText = await date.innerText();
    if (dateText === checkinDay) {
      await date.click();
      break;
    }
  }
});
