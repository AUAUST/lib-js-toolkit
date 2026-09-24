/**
 * Returns the names of all methods of the given object type that take no arguments
 * at all, that only have optional arguments or that take a single rest parameter.
 */
export type NullaryMethodName<T extends object> = {
  [K in keyof T]: T[K] extends infer R
    ? R extends (...args: []) => any
      ? K
      : never
    : never;
}[keyof T];
