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
> = Result | Callee<Arguments, Result, This>;

export type ResolvedValue<Value> = Value extends Callee
  ? CallReturnType<Value>
  : Value;

export type ValueInput<Input, Arguments extends any[], This> = Input &
  ([CallSignature<Input>] extends [(this: This, ...args: Arguments) => any]
    ? unknown
    : never);

export interface ValueResolver {
  <Result, Arguments extends any[], This = any>(
    this: This,
    input: (this: This, ...args: Arguments) => Result,
    ...args: Arguments
  ): Result;
  <Result, Arguments extends any[], This = any>(
    this: This,
    input: ResolvableValue<Result, Arguments, This>,
    ...args: Arguments
  ): Result;
  <Input, Arguments extends any[], This = any>(
    this: This,
    input: ValueInput<Input, Arguments, This>,
    ...args: Arguments
  ): ResolvedValue<Input>;
  call<Result, Arguments extends any[], This = any>(
    thisArg: This,
    input: (this: This, ...args: Arguments) => Result,
    ...args: Arguments
  ): Result;
  call<Result, Arguments extends any[], This = any>(
    thisArg: This,
    input: ResolvableValue<Result, Arguments, This>,
    ...args: Arguments
  ): Result;
  call<Input, Arguments extends any[], This = any>(
    thisArg: This,
    input: ValueInput<Input, Arguments, This>,
    ...args: Arguments
  ): ResolvedValue<Input>;
  apply<Result, Arguments extends any[], This = any>(
    thisArg: This,
    args: [
      input: (this: This, ...args: Arguments) => Result,
      ...args: Arguments,
    ],
  ): Result;
  apply<Result, Arguments extends any[], This = any>(
    thisArg: This,
    args: [input: ResolvableValue<Result, Arguments, This>, ...args: Arguments],
  ): Result;
  apply<Input, Arguments extends any[], This = any>(
    thisArg: This,
    args: [input: ValueInput<Input, Arguments, This>, ...args: Arguments],
  ): ResolvedValue<Input>;
}

export const value: ValueResolver = function value(
  this: any,
  input: unknown,
  ...args: unknown[]
): unknown {
  return isCallable(input) ? apply.call(this, input, args) : input;
} as ValueResolver;
