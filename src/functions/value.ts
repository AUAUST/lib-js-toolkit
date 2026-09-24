import { apply } from "@auaust/toolkit/apply";
import { isCallable } from "@auaust/toolkit/isCallable";
import type { Callee } from "@auaust/toolkit/types";

export type ResolvableValue<
  Result,
  Arguments extends readonly any[] = any,
  This = any,
> = Result | Callee<Arguments, Result, This>;

export type ResolvedValue<Value> =
  Value extends Callee<any, infer Result> ? Result : Value;

export function value<Result, Arguments extends any[], This = any>(
  this: This,
  input: ResolvableValue<Result, Arguments, This>,
  ...args: Arguments
): Result;
export function value(this: any, input: unknown, ...args: unknown[]): unknown {
  return isCallable(input) ? apply.call(this, input, args) : input;
}
