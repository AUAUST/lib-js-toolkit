import { apply } from "@auaust/toolkit/apply";
import { isCallable } from "@auaust/toolkit/isCallable";
import type {
  Callee,
  CallReturnType,
  CallSignature,
} from "@auaust/toolkit/types";

export type ResolvableValue<
  Value,
  Arguments extends readonly any[] = any,
  This = any,
> = Value | Callee<Arguments, Value, This>;

export type ResolvedValue<Value> = Value extends Callee
  ? CallReturnType<Value>
  : Value;

export type ValueInput<Input, Arguments extends any[], This> = Input &
  ([CallSignature<Input>] extends [(this: This, ...args: Arguments) => any]
    ? unknown
    : never);

export interface ValueResolver {
  <Value, Arguments extends any[], This = any>(
    this: This,
    input: (this: This, ...args: Arguments) => Value,
    ...args: Arguments
  ): Value;
  <Value, Arguments extends any[], This = any>(
    this: This,
    input: ResolvableValue<Value, Arguments, This>,
    ...args: Arguments
  ): Value;
  <Input, Arguments extends any[], This = any>(
    this: This,
    input: ValueInput<Input, Arguments, This>,
    ...args: Arguments
  ): ResolvedValue<Input>;
  call<Value, Arguments extends any[], This = any>(
    thisArg: This,
    input: (this: This, ...args: Arguments) => Value,
    ...args: Arguments
  ): Value;
  call<Value, Arguments extends any[], This = any>(
    thisArg: This,
    input: ResolvableValue<Value, Arguments, This>,
    ...args: Arguments
  ): Value;
  call<Input, Arguments extends any[], This = any>(
    thisArg: This,
    input: ValueInput<Input, Arguments, This>,
    ...args: Arguments
  ): ResolvedValue<Input>;
  apply<Value, Arguments extends any[], This = any>(
    thisArg: This,
    args: [
      input: (this: This, ...args: Arguments) => Value,
      ...args: Arguments,
    ],
  ): Value;
  apply<Value, Arguments extends any[], This = any>(
    thisArg: This,
    args: [input: ResolvableValue<Value, Arguments, This>, ...args: Arguments],
  ): Value;
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
