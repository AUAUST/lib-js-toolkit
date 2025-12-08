export type Value<V, T = any> = V | ((this: T) => V);

export function value<V>(input: Value<V>): V;
export function value<V, A extends any[], T>(
  input: V | ((this: T, ...args: A) => V),
  ...args: A
): V;
export function value(this: any, input: unknown, ...args: unknown[]): unknown {
  return typeof input === "function" ? input.apply(this, args) : input;
}
