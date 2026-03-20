// canvas/waitCanvasStable.ts
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { captureScoreRegion } from './captureScoreRegion.ts';

export async function waitCanvasStable(page) {
  let prev: PNG | null = null;
  let stableCount = 0;

  while (stableCount < 2) {
    const buf = await captureScoreRegion(page);
    const curr = PNG.sync.read(buf);

    if (
      prev &&
      pixelmatch(
        prev.data,
        curr.data,
        null,
        curr.width,
        curr.height,
        { threshold: 0.2 }
      ) < 40
    ) {
      stableCount++;
    } else {
      stableCount = 0;
    }

    prev = curr;
  }
}
