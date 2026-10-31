import { hasOwn } from "#modules/object/utils/hasOwn";
import { proto } from "#modules/object/utils/proto";

const objectConstructorSource = Function.prototype.toString.call(Object);

export function isPlainObject(
  candidate: unknown,
): candidate is Record<string, unknown> {
  if (
    !candidate ||
    typeof candidate !== "object" ||
    Symbol.toStringTag in candidate ||
    Symbol.iterator in candidate
  ) {
    return false;
  }

  const prototype = proto(candidate);

  if (
    prototype === null ||
    prototype === Object.prototype ||
    proto(prototype) === null
  ) {
    return true;
  }

  if (prototype) {
    if (proto(prototype) !== null) {
      return false;
    }

    if (hasOwn(prototype, "constructor")) {
      return (
        Function.prototype.toString.call(candidate.constructor) ===
        objectConstructorSource
      );
    }
  }

  return false;
}
