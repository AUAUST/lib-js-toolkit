import type { Callable } from "@auaust/toolkit/protocols/callable";

/**
 * A value that supports being called, either because it
 * is a function or implements the `Callable` protocol.
 */
export type Callee = Callable | ((...args: any[]) => any);
