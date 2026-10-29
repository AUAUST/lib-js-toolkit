import { hasOwn } from "#modules/object/utils/hasOwn";
import { ownKeys } from "#modules/object/utils/ownKeys";
import { isObject } from "#utils/isObject";
import type { PropertyComposer } from "#modules/composer/utils/propertyComposer";

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
