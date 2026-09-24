export type MethodName<T extends object> = {
  [K in keyof T]: T[K] extends infer R
    ? R extends (...args: any[]) => any
      ? K
      : never
    : never;
}[keyof T];
