import type { Callable } from "#modules/protocol/types/Callable";
import type { Fn } from "#types/Fn";
import type { MaybePromise } from "#types/MaybePromise";

/**
 * A value that supports being called, either because it is a function or
 * implements the `Callable` protocol, and returns its result or a promise of it.
 */
export type AsyncCallee<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> =
  | Callable<MaybePromise<Return>, Arguments, This>
  | Fn<MaybePromise<Return>, Arguments, This>;
