/**
 * Orders two items as `Array.prototype.sort` expects: negative when `left` comes
 * first, positive when `right` does, zero or `NaN` when they tie. Never receives
 * `undefined`, which sorts last.
 */
export type Comparator<Item> = (
  left: Exclude<Item, undefined>,
  right: Exclude<Item, undefined>,
) => number;
