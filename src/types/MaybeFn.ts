export type MaybeFn<T, Arguments extends any[] = any[], This = any> =
  | T
  | ((this: This, ...args: Arguments) => T);
