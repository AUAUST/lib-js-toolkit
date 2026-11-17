import { assertIntegerBounds } from "#modules/random/internals/assertIntegerBounds";
import { uint32Source } from "#modules/random/internals/uint32Source";
import { uniformInteger } from "#modules/random/internals/uniformInteger";

/**
 * Returns an endless iterator of uniform integers in [min, max], drawn from
 * buffered `crypto.getRandomValues` fills. Throws RangeError at call time for
 * unsafe bounds or spans.
 */
export function randomIntegerIterator(
  min: number,
  max: number,
): IteratorObject<number, never> {
  assertIntegerBounds(min, max);

  return generate(min, max);
}

function* generate(min: number, max: number): Generator<number, never> {
  const nextUint32 = uint32Source(256);

  while (true) {
    yield uniformInteger(min, max, nextUint32);
  }
}
