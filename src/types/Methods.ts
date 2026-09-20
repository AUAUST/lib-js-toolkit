export type Methods<T extends object> = {
  /**
   * If we did the following, the type level would be technically more accurate.
   * It would effectively filter out all non-method properties from the type,
   * whereas the current implementation includes all properties, but sets non-method properties to `never`.
   *
   * This approach is simpler and more permissive as it allows a more convenient
   * use of `keyof X`, which otherwise requires adding several more type constraints.
   *
   * ```ts
   * {
   *   [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
   * }
   * ```
   */
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};
