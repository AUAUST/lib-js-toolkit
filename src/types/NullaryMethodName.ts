/**
 * Returns the names of all methods of the given object type that take no arguments
 * at all, that only have optional arguments or that take a single rest parameter.
 */
export type NullaryMethodName<Target extends object> = {
  [K in keyof Target]: Target[K] extends infer R
    ? R extends (...args: []) => any
      ? K
      : never
    : never;
}[keyof Target];
