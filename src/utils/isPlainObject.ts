import { hasOwn } from "#modules/object/utils/hasOwn";
import { proto } from "#modules/object/utils/proto";

const objectConstructorSource = Function.prototype.toString.call(Object);

export function isPlainObject(
  input: unknown,
): input is Record<string, unknown> {
  if (
    !input ||
    typeof input !== "object" ||
    Symbol.toStringTag in input ||
    Symbol.iterator in input
  ) {
    return false;
  }

  const prototype = proto(input);

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
        Function.prototype.toString.call(input.constructor) ===
        objectConstructorSource
      );
    }
  }

  return false;
}
