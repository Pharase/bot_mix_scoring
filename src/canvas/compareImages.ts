import fs from 'fs';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';

/**
 * เปรียบเทียบภาพ 2 รูป
 * @return diffRatio (0.0 – 1.0)
 */
export async function compareImages(
  imgPath1: string,
  imgPath2: string
): Promise<number> {

  const img1 = sharp(imgPath1);
  const img2 = sharp(imgPath2);

  const meta1 = await img1.metadata();
  const meta2 = await img2.metadata();

  // resize ให้เท่ากัน ป้องกัน error
  const width = Math.min(meta1.width!, meta2.width!);
  const height = Math.min(meta1.height!, meta2.height!);

  const buf1 = await img1
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer();

  const buf2 = await img2
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffPixels = pixelmatch(
    buf1,
    buf2,
    null,
    width,
    height,
    { threshold: 0.75 }
  );

  return diffPixels / (width * height);
}