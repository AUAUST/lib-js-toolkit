import type { Emptiable } from "@auaust/toolkit/protocols/emptiable";

export type EmptyValue =
  | ""
  | []
  | Record<string, never>
  | Map<any, never>
  | Set<never>
  | null
  | undefined
  | Emptiable<true>;
