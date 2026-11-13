/**
 * A re-iterable wrapper whose passes replay the values already pulled from its source before pulling more.
 */
export interface MemoizedIterable<Value> extends Iterable<
  Value,
  undefined,
  unknown
> {
  [Symbol.iterator](): IteratorObject<Value, undefined>;
  /**
   * Pulls every remaining value and returns them all, frozen once the source is exhausted; after `close()`, returns the values pulled so far, unfrozen since they are partial. Never ends on an infinite source.
   */
  realize(): readonly Value[];
  /**
   * Closes the source; later passes replay the values already pulled, then end.
   */
  close(): void;
}
