import type { IsLiteral } from "@auaust/toolkit/types";

export type ExtractLiteral<T> = T extends infer U
  ? IsLiteral<U> extends true
    ? U
    : never
  : never;
