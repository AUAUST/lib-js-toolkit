import type { Constructor, InitializedProperty } from "@auaust/toolkit/types";

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
  target: any,
  key: PropertyKey,
  Constructor: Constructor<unknown, []>,
): any {
  if (!(key in target)) {
    target[key] = new Constructor();
  }

  return target[key];
}
