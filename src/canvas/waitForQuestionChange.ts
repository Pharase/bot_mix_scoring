import { hash } from './hash.ts';

export async function waitForQuestionChange(
  prevBuffer: Buffer,
  getCurrentBuffer: () => Promise<Buffer>,
  options = {
    stableMs: 100,
    timeout: 800
  }
): Promise<boolean> {

  const prevHash = hash(prevBuffer);

  let lastHash = '';
  let stableStart = 0;
  const start = Date.now();

  while (Date.now() - start < options.timeout) {
    const buf = await getCurrentBuffer();
    const h = hash(buf);

    if (h !== lastHash) {
      lastHash = h;
      stableStart = Date.now();
    }

    // ✅ hash ต่างจากข้อก่อน + นิ่งพอ
    if (
      h !== prevHash &&
      Date.now() - stableStart >= options.stableMs
    ) {
      return true;
    }

    await new Promise(r => setTimeout(r,20)); // capture ถี่
  }

  return false;
}