import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { captureScoreRegion } from './captureScoreRegion.ts';

let cachedTemplates: PNG[] | null = null;

function loadTemplates(paths: string[]): PNG[] {
  if (cachedTemplates) return cachedTemplates;

  cachedTemplates = paths.map(p =>
    PNG.sync.read(fs.readFileSync(p))
  );

  return cachedTemplates;
}

export async function detectCurrentQuestion(
  page,
  templates: string[]
): Promise<number | null> {

  const tplPNGs = loadTemplates(templates);

  const currBuf = await captureScoreRegion(page);
  const curr = PNG.sync.read(currBuf);

  let bestIndex: number | null = null;
  let bestDiff = Infinity;

  for (let i = 0; i < tplPNGs.length; i++) {
    const tpl = tplPNGs[i];

    const diff = pixelmatch(
      curr.data,
      tpl.data,
      null,
      curr.width,
      curr.height,
      {
        threshold: 0.15,
        includeAA: false
      }
    );

    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = i;
    }
  }

  // DEBUG (แนะนำเปิดช่วง tune)
  // console.log('bestDiff:', bestDiff, 'Q:', bestIndex);

  return bestDiff < 350 ? bestIndex : null;
}
// ค่า threshold อาจต้องปรับตามความละเอียดภาพ