export type IsNumberLiteral<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = T extends number ? (number extends T ? IfFalse : IfTrue) : IfFalse;
