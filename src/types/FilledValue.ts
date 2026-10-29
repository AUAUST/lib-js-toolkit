import type { FilledMember } from "#types/FilledMember";

/** Possible filled members of an input, preserving its properties and protocols. */
export type FilledValue<Value> = Value extends unknown
  ? Value & FilledMember<Value>
  : never;
