export type Fn<Args extends any[] = any[], Return = any, This = unknown> = (
  this: This,
  ...args: Args
) => Return;
