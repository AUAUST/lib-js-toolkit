import type { LooseRecord } from "#types/LooseRecord";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the object itself, typed as a record whose string and numeric keys
 * widen to `string` and symbol keys to `symbol`, values keeping their union.
 * Only the type changes. A nullish object returns `undefined`.
 */
export function loosenKeys<Target extends object>(
  object: Target,
): LooseRecord<Target>;
export function loosenKeys<Target extends object>(
  object: Maybe<Target>,
): LooseRecord<Target> | undefined;
export function loosenKeys(object: Maybe<object>): object | undefined {
  return object ?? undefined;
}
