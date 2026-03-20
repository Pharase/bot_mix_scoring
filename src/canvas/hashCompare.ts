import crypto from 'crypto';
import fs from 'fs';

function hash(buffer: Buffer): string {
  return crypto.createHash('md5').update(buffer).digest('hex');
}

export function isImageChanged(
  prevPath: string,
  currPath: string
): boolean {
  const prev = fs.readFileSync(prevPath);
  const curr = fs.readFileSync(currPath);

  return hash(prev) !== hash(curr);
}