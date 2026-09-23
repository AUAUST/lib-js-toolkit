export type IsSymbolLiteral<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = T extends symbol ? (symbol extends T ? IfFalse : IfTrue) : IfFalse;
