import { hasOwn } from "#modules/object/utils/hasOwn";
import { set } from "#modules/object/utils/set";
import type { Constructor } from "#types/Constructor";
import type { InitializedProperty } from "#types/InitializedProperty";

export function getOrCreate<
  Target extends object,
  Key extends PropertyKey,
  Create extends Constructor<unknown, []>,
>(
  target: Target,
  key: Key,
  Constructor: Create,
): InitializedProperty<Target, Key, InstanceType<Create>>;
export function getOrCreate(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey,
  Constructor: Constructor<unknown, []>,
): unknown {
  if (hasOwn(target, key)) {
    return target[key];
  }

  const created = new Constructor();

  set(target, key, created);

  return created;
}
