import type { IsLiteral } from "#types/IsLiteral";

export type ExtractLiteral<T> = T extends infer U
  ? IsLiteral<U> extends true
    ? U
    : never
  : never;
