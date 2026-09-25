import type { Callee, CallSignature } from "@auaust/toolkit/types";

export type CallParameters<Target extends Callee> = Readonly<
  Parameters<CallSignature<Target>>
>;
