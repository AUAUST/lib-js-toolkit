import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { randomUint32 } from "#modules/random/utils/randomUint32";

/**
 * Returns a uniform integer in [min, max]. Throws RangeError for unsafe
 * bounds or spans. Draws from the host's cryptographically secure generator
 * (`crypto.getRandomValues`), with no guarantee beyond the host's.
 */
export function randomInteger(min: number, max: number): number {
  if (
    !isSafeInteger(min) ||
    !isSafeInteger(max) ||
    min > max ||
    max - min > Number.MAX_SAFE_INTEGER
  ) {
    throw new RangeError(
      "Bounds must be safe integers with an ordered safe span.",
    );
  }

  const range = max - min + 1;

  if (range <= 2 ** 32) {
    const limit = 2 ** 32 - (2 ** 32 % range);

    let value: number;

    do {
      value = randomUint32();
    } while (value >= limit);

    return min + (value % range);
  }

  const limit = 2 ** 53 - (2 ** 53 % range);

  let value: number;

  do {
    value = (randomUint32() >>> 11) * 2 ** 32 + randomUint32();
  } while (value >= limit);

  return min + (value % range);
}
