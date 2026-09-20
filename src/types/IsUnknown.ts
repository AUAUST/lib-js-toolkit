export type IsUnknown<
  T,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = unknown extends T ? (T extends unknown ? IfTrue : IfFalse) : IfFalse;
