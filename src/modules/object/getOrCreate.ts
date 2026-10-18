import type { Constructor } from "@auaust/toolkit/types";

export function getOrCreate(
  target: any,
  key: PropertyKey,
  Constructor: Constructor,
) {
  if (!(key in target)) {
    target[key] = new Constructor();
  }

  return target[key];
}
