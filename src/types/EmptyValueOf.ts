import type { EmptyMember } from "#types/EmptyMember";

export type EmptyValueOf<Value> = Value extends unknown
  ? Value & EmptyMember<Value>
  : never;
