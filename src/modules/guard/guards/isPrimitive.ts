import type { Primitive } from "#types/Primitive";

export function isPrimitive(candidate: unknown): candidate is Primitive {
  return (
    candidate === null ||
    (typeof candidate !== "object" && typeof candidate !== "function")
  );
}
