export type Value<V, T = any> = V | ((this: T) => V);

export function value<V>(subject: Value<V>): V;
export function value<V, A extends any[], T>(
  subject: V | ((this: T, ...args: A) => V),
  ...args: A
): V;
export function value(
  this: any,
  subject: unknown,
  ...args: unknown[]
): unknown {
  return typeof subject === "function" ? subject.call(this, ...args) : subject;
}
