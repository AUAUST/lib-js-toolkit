import type { MaybeAsyncFn } from "#types/MaybeAsyncFn";

/**
 * A value, or a function returning the value or a promise of it. A bare promise
 * is a member only when `Return` includes it.
 */
export type ValueOrMaybeAsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> =
  | Return
  | MaybeAsyncFn<Return, Arguments, This>;
