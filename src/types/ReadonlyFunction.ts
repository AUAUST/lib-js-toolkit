import type { Signature } from "@auaust/toolkit/types";

export type ReadonlyFunction<Target extends Function> = Signature<Target> & {
  readonly [Key in keyof Target]: Target[Key];
};
