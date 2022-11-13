import * as crypto from "crypto";

function generateChecksum(str: string, algorithm?: string, encoding?: any) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

export {
  generateChecksum
}
