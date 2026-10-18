export function set(target: any, key: PropertyKey, value: any) {
  target[key] = value;

  return target;
}
