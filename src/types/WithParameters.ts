import type { Fn } from "@auaust/toolkit/types";

export type WithParameters<
  Arguments extends readonly any[],
  Function extends Fn,
> = (
  this: ThisParameterType<Function>,
  ...args: Arguments
) => ReturnType<Function>;
