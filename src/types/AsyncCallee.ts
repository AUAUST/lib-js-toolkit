import type { AsyncCallable } from "@auaust/toolkit/protocols/callable";
import type { AsyncFn } from "@auaust/toolkit/types";

/**
 * A value that supports being called, either because it
 * is a function or implements the `Callable` protocol.
 */
export type AsyncCallee<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = AsyncCallable<Return, Arguments, This> | AsyncFn<Return, Arguments, This>;
