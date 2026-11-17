import { uint32sPerInteger } from "#modules/random/internals/uint32sPerInteger";

export function uniformInteger(
  min: number,
  max: number,
  nextUint32: () => number,
): number {
  const range = max - min + 1;

  if (uint32sPerInteger(min, max) === 1) {
    const limit = 2 ** 32 - (2 ** 32 % range);

    let value: number;

    do {
      value = nextUint32();
    } while (value >= limit);

    return min + (value % range);
  }

  const limit = 2 ** 53 - (2 ** 53 % range);

  let value: number;

  do {
    value = (nextUint32() >>> 11) * 2 ** 32 + nextUint32();
  } while (value >= limit);

  return min + (value % range);
}
