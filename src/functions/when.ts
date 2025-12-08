import { type Value, value } from "./value";

export function when<T = void, F = undefined, This = any>(
  this: This,
  condition: Value<boolean>,
  callback: Value<T, This>,
  fallback?: Value<F, This>
): T | F {
  return value.call(this, condition)
    ? <T>value.call(this, callback)
    : <F>value.call(this, fallback);
}
