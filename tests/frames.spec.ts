import { test, expect } from "@playwright/test";
test("Frames demo", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  //total number of frames  present on the website
  const frames = page.frames();
  //console.log(frames.length);
  //Approach1
  //const frame = page.frame({
  // url: "https://ui.vision/demo/webtest/frames/frame_1",
  //});
  //if (frame) {
  //await frame.fill("[name='mytext1']", "Hello");
  //} else {
  // console.log("Frame is not avaliable");
  //}
  // await page.waitForTimeout(5000);

  // Approach2
  page;
  const inputbox = page
    .frameLocator('[src="frame_1.html"]')
    .locator("[name='mytext1']");
  inputbox.fill("Maryam");
  await page.waitForTimeout(5000);
});
test.only("Inner Frames demo", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const frame3 = await page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_3",
  });
  if (frame3) {
    frame3?.locator("[name='mytext3']").fill(" Wellcome Maryam ");
    const childFrame = frame3.childFrames();
    console.log("Child frame inside the frame 3:", childFrame.length);
    const radio = childFrame[0].getByLabel("I am a human");
    await radio.check();
    await expect(radio).toBeChecked();
  } else {
    console.log("Frame is not avalible");
  }
  await page.waitForTimeout(5000);
});
