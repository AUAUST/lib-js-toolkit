import { type Value, value } from "./value";

export function when<T = void, F = undefined>(
  condition: Value<boolean>,
  callback: Value<T>,
  fallback: Value<F> | undefined = undefined
): T | F {
  return value(condition) ? value(callback) : value(fallback)!;
}
