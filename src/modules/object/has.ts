export function has(target: any, key: PropertyKey) {
  return !!target && key in target;
}
