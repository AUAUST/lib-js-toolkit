import type { Callable } from "@auaust/toolkit/protocols/callable";
import type { Fn } from "@auaust/toolkit/types";

/**
 * A value that supports being called, either because it
 * is a function or implements the `Callable` protocol.
 */
export type Callee<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Callable<Return, Arguments, This> | Fn<Return, Arguments, This>;
