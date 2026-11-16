/**
 * Orders two items by their string forms, as `Array.prototype.sort` does
 * without a comparator.
 */
export function compareStringForms(left: unknown, right: unknown): -1 | 0 | 1 {
  const leftString = String(left);
  const rightString = String(right);

  if (leftString < rightString) {
    return -1;
  }

  return leftString > rightString ? 1 : 0;
}
