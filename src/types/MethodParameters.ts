export type MethodParameters<
  T extends object,
  K extends keyof T,
> = T[K] extends (...args: infer P) => any ? P : never;
