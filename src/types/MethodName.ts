export type MethodName<Target extends object> = {
  [K in keyof Target]: Target[K] extends infer R
    ? R extends (...args: any[]) => any
      ? K
      : never
    : never;
}[keyof Target];
