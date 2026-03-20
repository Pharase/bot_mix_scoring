import type { Page } from 'playwright';

export async function clickAt(page: Page, x: number, y: number, delay = 0): Promise<void> {
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x, y } });
  if (delay > 0) await page.waitForTimeout(delay);
}
