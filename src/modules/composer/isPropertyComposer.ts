import { isObject } from "@auaust/toolkit/isObject";
import { hasOwn, ownKeys } from "@auaust/toolkit/object";
import type { PropertyComposer } from "./propertyComposer";

export function isPropertyComposer(value: unknown): value is PropertyComposer {
  if (!isObject(value) || !hasOwn(value, "name")) {
    return false;
  }

  return ownKeys(value).every((key) => {
    return (
      key === "name" ||
      key === "value" ||
      key === "get" ||
      key === "set" ||
      key === "writable" ||
      key === "enumerable" ||
      key === "configurable"
    );
  });
}
