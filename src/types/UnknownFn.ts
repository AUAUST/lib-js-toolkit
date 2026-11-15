/**
 * Any function: it accepts any arguments, since parameters cannot be checked at
 * runtime, and returns `unknown`. It declares no `this` type, so every function
 * is assignable to it.
 */
export type UnknownFn = (...args: any[]) => unknown;
