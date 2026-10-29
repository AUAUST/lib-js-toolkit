import type { Emptiable } from "#modules/protocol/types/Emptiable";

export type EmptyValue =
  | ""
  | []
  | Record<string, never>
  | Map<any, never>
  | Set<never>
  | null
  | undefined
  | Emptiable<true>;
