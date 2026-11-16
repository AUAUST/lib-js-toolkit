import { ensureNotNullish } from "#modules/ensure/utils/ensureNotNullish";

/**
 * Returns the value when it is neither null nor undefined.
 *
 * @throws {AssertionError} when the value is null or undefined.
 * @root
 */
export function defined<Value>(
  value: Value,
  message = "Expected a value that is not null or undefined.",
): NonNullable<Value> {
  return ensureNotNullish(value, message);
}
