import { isCallable } from "#modules/function/guards/isCallable";
import { callMethod } from "#modules/function/utils/callMethod";
import { defineGetter } from "#modules/object/utils/defineGetter";
import { ownKeys } from "#modules/object/utils/ownKeys";

/**
 * Maps each view name to a key of the target, `true` for the same name, or a
 * function called with the target as `this`.
 */
export type ViewMapping<Target> = Readonly<
  Record<
    PropertyKey,
    keyof Target | true | ((this: Target, ...args: any[]) => unknown)
  >
>;

/**
 * Read-only view of `Target` exposing only the names of `Mapping`, typed as their
 * target members or as their functions without `this`.
 */
export type View<Target, Mapping extends ViewMapping<Target>> = {
  readonly [Name in keyof Mapping]: Mapping[Name] extends true
    ? Name extends keyof Target
      ? Target[Name]
      : never
    : Mapping[Name] extends keyof Target
      ? Target[Mapping[Name]]
      : OmitThisParameter<Mapping[Name]>;
};

/**
 * Creates a plain object exposing only the mapped members of `target`, each under
 * its mapping name, as a read-only enumerable getter.
 *
 * A mapping value is a key of `target`, `true` for the member of the same name,
 * or a function. Members are read live from `target`; callable members and
 * mapping functions are returned as functions created once per name that call
 * them with `target` as `this`.
 */
export function view<
  Target extends object,
  const Mapping extends ViewMapping<Target>,
>(target: Target, mapping: Mapping): View<Target, Mapping>;
export function view(
  target: Record<PropertyKey, any>,
  mapping: ViewMapping<Record<PropertyKey, any>>,
): object {
  const result = {};

  for (const name of ownKeys(mapping)) {
    const value = mapping[name];

    if (isCallable(value)) {
      const bound = (...args: unknown[]) => callMethod(target, value, ...args);

      defineGetter(result, name, () => bound);

      continue;
    }

    const key = value === true ? name : value;

    const bound = (...args: unknown[]) => callMethod(target, key, ...args);

    defineGetter(result, name, () => {
      return isCallable(target[key]) ? bound : target[key];
    });
  }

  return result;
}
