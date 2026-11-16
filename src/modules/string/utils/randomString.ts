import { from } from "#modules/array/utils/from";
import { flag } from "#modules/general/utils/flag";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { randomInteger } from "#modules/random/utils/randomInteger";

interface RandomStringLength {
  /**
   * Number of characters to draw; defaults to 8.
   */
  readonly length?: number;
}

interface RandomStringPool extends RandomStringLength {
  /**
   * Characters to draw from, used as given in place of the default pool.
   */
  readonly pool: string;
  readonly uppercase?: never;
}

interface RandomStringCasing extends RandomStringLength {
  readonly pool?: never;
  /**
   * Adds `A–Z` to the default `a–z` and `0–9` pool; defaults to `true`.
   */
  readonly uppercase?: boolean;
}

/**
 * Options of `randomString`; `pool` and `uppercase` are exclusive.
 */
export type RandomStringOptions = RandomStringPool | RandomStringCasing;

const lowercasePool = "abcdefghijklmnopqrstuvwxyz0123456789";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Returns `length` characters drawn uniformly from the pool with `randomInteger`.
 * A number is the `length` shorthand.
 *
 * @throws {RangeError} when `length` is not a non-negative safe integer
 * or `pool` is empty.
 */
export function randomString(options?: RandomStringOptions | number): string {
  const {
    length = 8,
    pool,
    uppercase = true,
  } = flag<RandomStringOptions, "length">(options, "length");

  if (!isSafeInteger(length) || length < 0) {
    throw new RangeError("Length must be a non-negative safe integer.");
  }

  const characters = from(
    pool ?? (uppercase ? lowercasePool + uppercaseLetters : lowercasePool),
  );

  if (characters.length === 0) {
    throw new RangeError("Pool must not be empty.");
  }

  let result = "";

  for (let index = 0; index < length; index++) {
    result += characters[randomInteger(0, characters.length - 1)];
  }

  return result;
}
