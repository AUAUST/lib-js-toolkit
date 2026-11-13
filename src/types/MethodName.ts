// @debt Mapping over an array type yields an array, so `MethodName<number[]>` misses array methods such as `"at"`; overloads keyed on it fall through for arrays.
export type MethodName<Target extends object> = {
  [K in keyof Target]: Target[K] extends infer R
    ? R extends (...args: any[]) => any
      ? K
      : never
    : never;
}[keyof Target];
