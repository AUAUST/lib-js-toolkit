import type { IsLiteral } from "@auaust/toolkit";

export type ExtractLiteral<T> = T extends infer U
  ? IsLiteral<U> extends true
    ? U
    : never
  : never;
