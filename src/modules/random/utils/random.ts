import { randomUint32 } from "#modules/random/utils/randomUint32";

/** Returns a float in [0, 1). Draws from the host's cryptographically secure generator (`crypto.getRandomValues`), with no guarantee beyond the host's. */
export function random(): number {
  return ((randomUint32() >>> 5) * 2 ** 26 + (randomUint32() >>> 6)) / 2 ** 53;
}
