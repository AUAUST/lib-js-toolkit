import type { Fn } from "@auaust/toolkit/types";

export type WithThisParameter<This, Function extends Fn> = (
  this: This,
  ...args: Parameters<Function>
) => ReturnType<Function>;
