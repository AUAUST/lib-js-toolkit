export function setOrDelete(target: any, key: PropertyKey, value: any) {
  if (value === undefined) {
    delete target[key];
  } else {
    target[key] = value;
  }

  return target;
}
