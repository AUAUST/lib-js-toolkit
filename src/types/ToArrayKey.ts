import type { IsNever } from "#types/IsNever";
import type { StringToNumber } from "#types/StringToNumber";

export type ToArrayKey<Key extends PropertyKey> = Key extends symbol | number
  ? Key
  : Key extends string
    ? StringToNumber<Key> extends infer Index
      ? IsNever<Index, Key, Index>
      : never
    : Key;
