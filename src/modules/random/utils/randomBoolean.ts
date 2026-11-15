import { random } from "#modules/random/utils/random";

/**
 * Returns `true` with the given probability, drawn with `random`.
 *
 * @throws {RangeError} for a probability outside [0, 1].
 */
export function randomBoolean(probability = 0.5): boolean {
  if (!(probability >= 0 && probability <= 1)) {
    throw new RangeError("Probability must be within [0, 1].");
  }

  return random() < probability;
}
