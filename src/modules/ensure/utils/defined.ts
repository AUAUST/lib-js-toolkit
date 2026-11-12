import { ensureNotNullish } from "#modules/ensure/utils/ensureNotNullish";

/**
 * Returns the value when it is neither null nor undefined; otherwise throws an `AssertionError`.
 *
 * @root
 */
export function defined<Value>(
  value: Value,
  message = "Expected a value that is not null or undefined.",
): NonNullable<Value> {
  // @debt TypeScript does not relate `Exclude<Value, null | undefined>` to `NonNullable<Value>` for a generic `Value`, hence the cast.
  return ensureNotNullish(value, message) as NonNullable<Value>;
}
