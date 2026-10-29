import type { AsyncCallable } from "#modules/protocol/types/AsyncCallable";
import type { AsyncFn } from "#types/AsyncFn";

/**
 * A value that supports being called, either because it
 * is a function or implements the `Callable` protocol.
 */
export type AsyncCallee<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = AsyncCallable<Return, Arguments, This> | AsyncFn<Return, Arguments, This>;
