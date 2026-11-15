import type { ReadonlyMapLike } from "#modules/maplike/types/ReadonlyMapLike";
import type { WritableMapLike } from "#modules/maplike/types/WritableMapLike";

/**
 * A keyed store that can be read and written, such as a `Map` or a `WeakMap`.
 */
export interface MapLike<Key, Value>
  extends ReadonlyMapLike<Key, Value>, WritableMapLike<Key, Value> {}
