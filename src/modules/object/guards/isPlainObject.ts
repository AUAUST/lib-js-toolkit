import { proto } from "#modules/object/utils/proto";

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

  return (
    prototype === null ||
    prototype === Object.prototype ||
    proto(prototype) === null
  );
}
