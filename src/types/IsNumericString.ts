import type { IsNever, StringToNumber } from "@auaust/toolkit/types";

export type IsNumericString<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = T extends string
  ? StringToNumber<T> extends infer N
    ? IsNever<N, IfFalse, IfTrue>
    : IfFalse
  : IfFalse;
