// @debt Functions with typed parameters are not assignable under `strictFunctionTypes`, short of the "any function is assignable" intent.
/**
 * A function taking any `unknown` arguments. It declares no `this` type, so
 * functions declaring one are assignable to it.
 */
export type UnknownFn = (...args: unknown[]) => unknown;
