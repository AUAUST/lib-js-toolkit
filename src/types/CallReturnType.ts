import type { Callee, CallSignature } from "@auaust/toolkit/types";

export type CallReturnType<Target extends Callee> = ReturnType<
  CallSignature<Target>
>;
