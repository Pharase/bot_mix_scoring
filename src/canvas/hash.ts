import crypto from 'crypto';

export function hash(buffer: Buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex');
}