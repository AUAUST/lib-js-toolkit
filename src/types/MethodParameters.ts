export type MethodParameters<
  T extends object,
  K extends keyof T,
> = T[K] extends infer Fn
  ? Fn extends (...args: infer P) => any
    ? Readonly<P>
    : never
  : never;
