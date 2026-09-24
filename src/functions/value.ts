import { apply } from "@auaust/toolkit/apply";
import { isCallable } from "@auaust/toolkit/isCallable";
import type { Callee } from "@auaust/toolkit/types";

export type Value<V, This = any, Arguments extends readonly any[] = any> =
  | V
  | Callee<Arguments, V, This>;

export type ResolvedValue<V> = V extends Callee<any, infer R> ? R : V;

export function value<V, This = any>(this: This, input: Value<V, This>): V;
export function value<V, A extends any[], This = any>(
  this: This,
  input: V | ((this: This, ...args: A) => V),
  ...args: A
): V;
export function value(this: any, input: unknown, ...args: unknown[]): unknown {
  return isCallable(input) ? apply.call(this, input, args) : input;
}
