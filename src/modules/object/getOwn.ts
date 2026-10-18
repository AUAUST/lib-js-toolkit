import { hasOwn } from "@auaust/toolkit/object";

export function getOwn(target: any, key: PropertyKey) {
  if (hasOwn(target, key)) {
    return target[key];
  }
}
