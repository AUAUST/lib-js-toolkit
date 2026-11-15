import type { ToObject } from "#types/ToObject";

/**
 * Converts any value to an object: objects and functions are returned as is,
 * primitives give their wrapper objects and nullish values a new empty object.
 *
 * @native variant Object
 */
export function toObject<const Input>(input: Input): ToObject<Input>;
export function toObject(input: unknown): object {
  return new Object(input);
}
