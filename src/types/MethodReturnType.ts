export type MethodReturnType<
  T extends object,
  K extends keyof T,
> = T[K] extends (...args: any[]) => infer R ? R : never;
