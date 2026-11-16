import { value, type ResolvableValue } from "#modules/general/utils/value";

/**
 * Resolves `callback` when `condition` resolves truthy, otherwise `fallback`,
 * each with `args` and the caller's `this`. Unlike the `createWhen` conditionals,
 * it never narrows.
 */
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
