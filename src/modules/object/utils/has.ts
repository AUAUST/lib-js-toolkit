export function has<Target, Key extends PropertyKey>(
  target: Target,
  key: Key,
): target is Target & Record<Key, unknown>;
export function has(target: any, key: PropertyKey): boolean {
  return !!target && key in target;
}
