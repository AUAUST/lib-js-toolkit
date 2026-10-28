import { value, type ResolvableValue } from "@auaust/toolkit/value";

export function when<
  IfTrue = void,
  IfFalse = undefined,
  Arguments extends readonly any[] = any,
  This = any,
>(
  this: This,
  condition: ResolvableValue<unknown, Arguments, This>,
  callback: ResolvableValue<IfTrue, Arguments, This>,
  fallback?: ResolvableValue<IfFalse, Arguments, This>,
  ...args: Arguments
): IfTrue | IfFalse {
  return value.call(this, condition, ...args)
    ? value.call(this, callback, ...args)
    : value.call(this, fallback, ...args)!;
}
