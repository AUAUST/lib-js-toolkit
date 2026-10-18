export type Fn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = unknown,
> = (this: This, ...args: Arguments) => Return;
