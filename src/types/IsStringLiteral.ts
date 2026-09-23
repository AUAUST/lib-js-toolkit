export type IsStringLiteral<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = T extends string
  ? {} extends Record<T, never>
    ? IfFalse
    : IfTrue
  : IfFalse;
