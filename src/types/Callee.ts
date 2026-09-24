import type { Callable } from "@auaust/toolkit/protocols/callable";

/**
 * A value that supports being called, either because it
 * is a function or implements the `Callable` protocol.
 */
export type Callee<
  Arguments extends readonly any[] = any,
  Return = any,
  This = any,
> =
  | Callable<Arguments, Return, This>
  | ((this: This, ...args: Arguments) => Return);
