import { isArray } from "#modules/array/guards/isArray";
import { sameValueZero } from "#modules/general/utils/sameValueZero";
import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { keys } from "#modules/object/utils/keys";

type ComparedPairs = Map<object, Set<object>>;

/**
 * Compares two values deeply. Arrays are equal when their lengths and elements
 * are; plain objects when their own enumerable string keys and the values under
 * them are. Every other value, class instances included, is compared with
 * `sameValueZero`. A pair of containers already under comparison counts as equal,
 * so cyclic structures compare without looping.
 */
export function deepEquals(a: unknown, b: unknown): boolean {
  return compareDeeply(a, b, new Map());
}

function compareDeeply(a: unknown, b: unknown, pairs: ComparedPairs): boolean {
  if (sameValueZero(a, b)) {
    return true;
  }

  if (isArray(a) && isArray(b)) {
    return (
      markCompared(a, b, pairs) ||
      (a.length === b.length &&
        a.every((element, index) => compareDeeply(element, b[index], pairs)))
    );
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    if (markCompared(a, b, pairs)) {
      return true;
    }

    const aKeys = keys(a);
    const bKeys = new Set(keys(b));

    return (
      aKeys.length === bKeys.size &&
      aKeys.every((key) => {
        return bKeys.has(key) && compareDeeply(a[key], b[key], pairs);
      })
    );
  }

  return false;
}

function markCompared(a: object, b: object, pairs: ComparedPairs): boolean {
  const compared = pairs.get(a);

  if (compared?.has(b)) {
    return true;
  }

  if (compared) {
    compared.add(b);
  } else {
    pairs.set(a, new Set([b]));
  }

  return false;
}
