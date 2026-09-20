export type IsAny<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = 0 extends 1 & T ? IfTrue : IfFalse;
