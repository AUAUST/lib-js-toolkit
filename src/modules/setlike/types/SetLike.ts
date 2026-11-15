import type { ReadonlySetLike } from "#modules/setlike/types/ReadonlySetLike";
import type { WritableSetLike } from "#modules/setlike/types/WritableSetLike";

/**
 * A collection that can be queried and added to, such as a `Set` or a `WeakSet`.
 */
export interface SetLike<Value>
  extends ReadonlySetLike<Value>, WritableSetLike<Value> {}
