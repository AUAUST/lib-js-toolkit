import type { Fn } from "#types/Fn";

export type WithParameters<
  Arguments extends readonly any[],
  Function extends Fn,
> = (
  this: ThisParameterType<Function>,
  ...args: Arguments
) => ReturnType<Function>;
