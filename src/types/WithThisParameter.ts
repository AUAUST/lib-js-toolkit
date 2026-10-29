import type { Fn } from "#types/Fn";

export type WithThisParameter<This, Function extends Fn> = (
  this: This,
  ...args: Parameters<Function>
) => ReturnType<Function>;
