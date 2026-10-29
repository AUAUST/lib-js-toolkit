import type { Callable } from "#modules/protocol/types/Callable";
import type { Fn } from "#types/Fn";

/**
 * A value that supports being called, either because it
 * is a function or implements the `Callable` protocol.
 */
export type Callee<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Callable<Return, Arguments, This> | Fn<Return, Arguments, This>;
