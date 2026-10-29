import type { Fn } from "#types/Fn";

export type WithReturnType<Return, Function extends Fn> = (
  this: ThisParameterType<Function>,
  ...args: Parameters<Function>
) => Return;
