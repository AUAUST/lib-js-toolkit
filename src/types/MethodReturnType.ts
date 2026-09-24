export type MethodReturnType<
  T extends object,
  K extends keyof T,
> = T[K] extends infer Fn
  ? Fn extends (...args: any[]) => infer R
    ? R
    : never
  : never;
