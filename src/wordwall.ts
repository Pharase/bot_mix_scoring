import { chromium, expect, Page, Browser } from '@playwright/test';

type ClickCanvasFn = (x: number, y: number, delay?: number) => Promise<void>;

export async function runWordwallBot(): Promise<void> {
  const browser: Browser = await chromium.launch({
    headless: false, // เห็นเบราว์เซอร์
    slowMo: 50       // ชะลอให้เหมือนคน
  });

  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto('https://wordwall.net/play/103557/492/139');

  await expect(
    page.getByRole('heading', {
      name: '8th Safety Promotion Activity : Road Safety'
    })
  ).toBeVisible();

  // ---------- Fill name ----------
  await page.getByRole('textbox', { name: 'Name...' }).click();
  await page.getByRole('textbox', { name: 'Name...' }).fill('User');
  await page.getByRole('checkbox', { name: 'Remember me?' }).uncheck();
  await page.getByRole('button', { name: 'Start' }).click();

  await page.waitForTimeout(1200);

  const canvas = page.locator('canvas');

  const clickCanvas: ClickCanvasFn = async (
    x: number,
    y: number,
    delay: number = 800
  ): Promise<void> => {
    await canvas.click({ position: { x, y } });
    if (delay > 0) {
      await page.waitForTimeout(delay);
    }
  };

  // ---------- Initial ----------
  await clickCanvas(630, 411, 1000);

  // ---------- Answer 1 ----------
  await clickCanvas(148, 479, 1000);
  await clickCanvas(702, 687, 700);

  // ---------- Answer 2 ----------
  await clickCanvas(148, 479, 1000);
  await clickCanvas(705, 691, 700);

  // ---------- Answer 3 ----------
  await clickCanvas(148, 479, 850);
  await clickCanvas(705, 691, 800);

  // ---------- Answer 4 ----------
  await clickCanvas(942, 432, 850);
  await clickCanvas(705, 691, 800);

  // ---------- Answer 5 ----------
  await clickCanvas(148, 479, 850);
  await clickCanvas(705, 691, 800);

  // ---------- Answer 6 ----------
  await clickCanvas(942, 432, 800);
  await clickCanvas(678, 297, 1000);
  await clickCanvas(642, 376, 1000);

  // ---------- Hold score page ----------
  console.log('Finished. Browser is paused.');
  await page.pause();

  // await browser.close(); // ปิดเองถ้าต้องการ
}
