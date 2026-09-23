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

  const prototype = Object.getPrototypeOf(input);

  if (
    prototype === null ||
    prototype === Object.prototype ||
    Object.getPrototypeOf(prototype) === null
  ) {
    return true;
  }

  if (prototype) {
    if (Object.getPrototypeOf(prototype) !== null) {
      return false;
    }

    if (Object.hasOwn(prototype, "constructor")) {
      return (
        Function.prototype.toString.call(input.constructor) ===
        objectConstructorSource
      );
    }
  }

  return false;
}
