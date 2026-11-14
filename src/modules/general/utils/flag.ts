import { isObject } from "#modules/object/guards/isObject";

/**
 * Normalizes an options parameter whose primitive shorthand sets `property`:
 * returns an object as is, `{}` for `undefined` and `{ [property]: options }`
 * for any other primitive.
 */
export function flag<Options extends object, Property extends keyof Options>(
  options: Options | Exclude<Options[Property], object> | undefined,
  property: Property,
): Options;
export function flag(options: unknown, property: PropertyKey): object {
  if (isObject(options)) {
    return options;
  }

  if (options === undefined) {
    return {};
  }

  return { [property]: options };
}
