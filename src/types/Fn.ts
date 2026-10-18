export type Fn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = (this: This, ...args: Arguments) => Return;
