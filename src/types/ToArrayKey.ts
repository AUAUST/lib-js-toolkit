import type { IsNever, StringToNumber } from "@auaust/toolkit/types";

export type ToArrayKey<Key extends PropertyKey> = Key extends symbol | number
  ? Key
  : Key extends string
    ? StringToNumber<Key> extends infer Index
      ? IsNever<Index, Key, Index>
      : never
    : Key;
