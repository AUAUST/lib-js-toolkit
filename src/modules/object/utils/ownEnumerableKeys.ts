import { isEnumerable } from "#modules/object/utils/isEnumerable";
import { ownKeys } from "#modules/object/utils/ownKeys";

/**
 * Lists `target`'s own enumerable string and symbol keys, in `Reflect.ownKeys`
 * order: the keys object spread copies.
 */
export function ownEnumerableKeys<Target extends {}>(
  target: Target,
): (keyof Target)[] {
  return ownKeys(target).filter((key) => isEnumerable(target, key));
}
