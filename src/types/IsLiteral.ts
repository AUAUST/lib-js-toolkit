import type { IsNumberLiteral } from "#types/IsNumberLiteral";
import type { IsStringLiteral } from "#types/IsStringLiteral";
import type { IsSymbolLiteral } from "#types/IsSymbolLiteral";

export type IsLiteral<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = T extends string
  ? IsStringLiteral<T, IfTrue, IfFalse>
  : T extends number
    ? IsNumberLiteral<T, IfTrue, IfFalse>
    : T extends symbol
      ? IsSymbolLiteral<T, IfTrue, IfFalse>
      : IfFalse;
