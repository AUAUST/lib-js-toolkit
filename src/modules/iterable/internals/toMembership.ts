import { isFunction } from "#modules/function/guards/isFunction";
import { isIterable } from "#modules/iterable/guards/isIterable";
import { isObject } from "#modules/object/guards/isObject";

export function toMembership(
  other: Iterable<unknown> | { has(value: unknown): unknown },
): (value: unknown) => boolean {
  if (isObject(other) && "has" in other && isFunction(other.has)) {
    return (value) => Boolean(other.has(value));
  }

  if (!isIterable(other)) {
    throw new TypeError("Expected an iterable or a set-like.");
  }

  const members = new Set(other);

  return (value) => members.has(value);
}
