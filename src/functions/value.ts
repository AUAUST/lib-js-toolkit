export type Value<V> = V | (() => V);

export function value<V>(subject: Value<V>): V;
export function value<V, A extends any[]>(
  subject: V | ((...args: A) => V),
  ...args: A
): V;
export function value(subject: unknown, ...args: unknown[]): unknown {
  return typeof subject === "function" ? subject(...args) : subject;
}
