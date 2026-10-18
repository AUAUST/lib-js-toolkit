export type MethodReturnType<
  Target extends object,
  Name extends keyof Target,
> = Target[Name] extends infer Fn
  ? Fn extends (...args: any[]) => infer R
    ? R
    : never
  : never;
