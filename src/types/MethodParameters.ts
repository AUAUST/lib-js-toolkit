export type MethodParameters<
  Target extends object,
  Name extends keyof Target,
> = Target[Name] extends infer Fn
  ? Fn extends (...args: infer P) => any
    ? Readonly<P>
    : never
  : never;
