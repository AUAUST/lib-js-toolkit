import { type ResolvableValue, value } from "@auaust/toolkit/value";

export function when<
  IfTrue = void,
  IfFalse = undefined,
  Arguments extends any[] = any,
  This = any,
>(
  this: This,
  condition: ResolvableValue<unknown, Arguments, This>,
  callback: ResolvableValue<IfTrue, Arguments, This>,
  fallback?: ResolvableValue<IfFalse, Arguments, This>,
  ...args: Arguments
): IfTrue | IfFalse {
  return value.call(this, condition, ...args)
    ? <IfTrue>value.call(this, callback, ...args)
    : <IfFalse>value.call(this, fallback, ...args);
}
