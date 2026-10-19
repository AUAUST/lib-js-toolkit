import type { EmptyMember } from "@auaust/toolkit/types";

export type EmptyValueOf<Value> = Value extends unknown
  ? Value & EmptyMember<Value>
  : never;
