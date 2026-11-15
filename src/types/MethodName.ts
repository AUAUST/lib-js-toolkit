// @debt Mapping over an array type yields an array, so `MethodName<number[]>` misses array methods such as `"at"`; overloads keyed on it fall through for arrays.
// @debt A union target counts a name as a method when any member holds a callable under it, since `R` distributes: `"x"` passes for `{ x: 1 } | { x(): 1 }`.
export type MethodName<Target extends object> = {
  [K in keyof Target]: Target[K] extends infer R
    ? R extends (...args: any[]) => any
      ? K
      : never
    : never;
}[keyof Target];
