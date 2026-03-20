import fs from 'fs';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';

export async function detectTemplate(
  canvasPath: string,
  templatePath: string,
  threshold = 0.5
): Promise<boolean> {
  const canvas = sharp(canvasPath);
  const template = sharp(templatePath);

  const { data: canvasData, info: cInfo } = await canvas
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: tempData, info: tInfo } = await template
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (cInfo.width < tInfo.width || cInfo.height < tInfo.height) {
    return false;
  }

  let minDiff = Infinity;

  for (let y = 0; y <= cInfo.height - tInfo.height; y += 10) {
    for (let x = 0; x <= cInfo.width - tInfo.width; x += 10) {
      const diff = pixelmatch(
        canvasData,
        tempData,
        null,
        tInfo.width,
        tInfo.height,
        { threshold }
      );
      minDiff = Math.min(minDiff, diff);
    }
  }

  return minDiff < 700; // ปรับตามความละเอียดภาพ
}
