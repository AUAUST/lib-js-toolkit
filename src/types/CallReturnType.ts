import type { Callee } from "#types/Callee";
import type { CallSignature } from "#types/CallSignature";

export type CallReturnType<Target extends Callee> = ReturnType<
  CallSignature<Target>
>;
