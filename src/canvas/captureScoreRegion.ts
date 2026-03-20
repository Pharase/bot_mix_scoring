import type { Page } from 'playwright';

export async function captureScoreRegion(page: Page): Promise<Buffer> {
  return await page.screenshot({
    type: 'png',
    clip: {
      x: 1250,
      y: 0,
      width: 30,
      height: 30
    }
  });
}