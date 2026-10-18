import type { Fn } from "@auaust/toolkit/types";

export type WithReturnType<Return, Function extends Fn> = (
  this: ThisParameterType<Function>,
  ...args: Parameters<Function>
) => Return;
