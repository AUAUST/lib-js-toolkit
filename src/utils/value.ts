import { apply } from "@auaust/toolkit/apply";
import { isCallable } from "@auaust/toolkit/isCallable";
import type {
  Callee,
  CallReturnType,
  CallSignature,
} from "@auaust/toolkit/types";

export type ResolvableValue<
  Result,
  Arguments extends readonly any[] = any,
  This = any,
> = Result | Callee<Result, Arguments, This>;

export type ResolvedValue<Value> = Value extends Callee
  ? CallReturnType<Value>
  : Value;

export type ValueInput<Input, Arguments extends readonly any[], This> = Input &
  ([CallSignature<Input>] extends [(this: This, ...args: Arguments) => any]
    ? unknown
    : never);

export interface ValueResolver {
  <Value, Arguments extends readonly any[], This = any>(
    this: This,
    input: (this: This, ...args: Arguments) => Value,
    ...args: Arguments
  ): Value;
  <Value, Arguments extends readonly any[], This = any>(
    this: This,
    input: ResolvableValue<Value, Arguments, This>,
    ...args: Arguments
  ): Value;
  <Input, Arguments extends readonly any[], This = any>(
    this: This,
    input: ValueInput<Input, Arguments, This>,
    ...args: Arguments
  ): ResolvedValue<Input>;
  call<Value, Arguments extends readonly any[], This = any>(
    thisArg: This,
    input: (this: This, ...args: Arguments) => Value,
    ...args: Arguments
  ): Value;
  call<Value, Arguments extends readonly any[], This = any>(
    thisArg: This,
    input: ResolvableValue<Value, Arguments, This>,
    ...args: Arguments
  ): Value;
  call<Input, Arguments extends readonly any[], This = any>(
    thisArg: This,
    input: ValueInput<Input, Arguments, This>,
    ...args: Arguments
  ): ResolvedValue<Input>;
  apply<Value, Arguments extends readonly any[], This = any>(
    thisArg: This,
    args: readonly [
      input: (this: This, ...args: Arguments) => Value,
      ...args: Arguments,
    ],
  ): Value;
  apply<Value, Arguments extends readonly any[], This = any>(
    thisArg: This,
    args: readonly [
      input: ResolvableValue<Value, Arguments, This>,
      ...args: Arguments,
    ],
  ): Value;
  apply<Input, Arguments extends readonly any[], This = any>(
    thisArg: This,
    args: readonly [
      input: ValueInput<Input, Arguments, This>,
      ...args: Arguments,
    ],
  ): ResolvedValue<Input>;
}

export const value: ValueResolver = function value(
  this: any,
  input: unknown,
  ...args: unknown[]
): unknown {
  return isCallable(input) ? apply.call(this, input, args) : input;
};
