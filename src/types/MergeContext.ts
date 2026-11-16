/**
 * What a `merger` closure knows about the key it resolves.
 */
export interface MergeContext {
  /**
   * The key being resolved.
   */
  readonly key: PropertyKey;
  /**
   * The keys from the merge's target to `key`, in `getPath`'s format.
   */
  readonly path: readonly PropertyKey[];
  /**
   * The object the closure's return value is assigned to.
   */
  readonly target: object;
  /**
   * Resolves `values` under the default merge rule, recursing with the same
   * closure; a first value identical to the target's own one merges into it.
   */
  merge(values: readonly unknown[]): unknown;
}
