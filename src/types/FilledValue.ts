import type { FilledMember } from "@auaust/toolkit/types";

/** Possible filled members of an input, preserving its properties and protocols. */
export type FilledValue<Value> = Value extends unknown
  ? Value & FilledMember<Value>
  : never;
