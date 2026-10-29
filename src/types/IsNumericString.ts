import type { IsNever } from "#types/IsNever";
import type { StringToNumber } from "#types/StringToNumber";

export type IsNumericString<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = T extends string
  ? StringToNumber<T> extends infer N
    ? IsNever<N, IfFalse, IfTrue>
    : IfFalse
  : IfFalse;
