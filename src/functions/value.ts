export type Value<V, This = any> = V | ((this: This) => V);

export function value<V, This = any>(this: This, input: Value<V, This>): V;
export function value<V, A extends any[], This = any>(
  this: This,
  input: V | ((this: This, ...args: A) => V),
  ...args: A
): V;
export function value(this: any, input: unknown, ...args: unknown[]): unknown {
  return typeof input === "function" ? input.apply(this, args) : input;
}
