import { value } from "@auaust/toolkit/value";

export function getOrSet(target: any, key: PropertyKey, fallback: any) {
  if (!(key in target)) {
    target[key] = value(fallback, key);
  }

  return target[key];
}
