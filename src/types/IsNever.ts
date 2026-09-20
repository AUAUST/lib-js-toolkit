export type IsNever<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = [T] extends [never] ? IfTrue : IfFalse;
