import { isArray } from "#modules/array/guards/isArray";
import type { TypeName } from "#types/TypeName";
import type { TypeNames } from "#types/TypeNames";

/**
 * Returns `true` when the candidate matches any of the given type names, testing
 * them in order and stopping at the first match.
 *
 * @throws {TypeError} on a name that is no type name, once reached.
 */
// eslint-disable-next-line auaust/cognitive-complexity -- one inline test per type name, kept in a single function for speed
export function is<const Names extends readonly TypeName[]>(
  candidate: unknown,
  ...types: Names
): candidate is TypeNames[Names[number]] {
  for (const type of types) {
    switch (type) {
      case "string": {
        if (typeof candidate === "string") {
          return true;
        }

        break;
      }

      case "number": {
        if (typeof candidate === "number") {
          return true;
        }

        break;
      }

      case "boolean": {
        if (typeof candidate === "boolean") {
          return true;
        }

        break;
      }

      case "object": {
        if (typeof candidate === "object" && candidate !== null) {
          return true;
        }

        break;
      }

      case "array": {
        if (isArray(candidate)) {
          return true;
        }

        break;
      }

      case "function": {
        if (typeof candidate === "function") {
          return true;
        }

        break;
      }

      case "undefined": {
        if (candidate === undefined) {
          return true;
        }

        break;
      }

      case "null": {
        if (candidate === null) {
          return true;
        }

        break;
      }

      case "nullish": {
        if (candidate == null) {
          return true;
        }

        break;
      }

      case "bigint": {
        if (typeof candidate === "bigint") {
          return true;
        }

        break;
      }

      case "symbol": {
        if (typeof candidate === "symbol") {
          return true;
        }

        break;
      }

      case "primitive": {
        if (
          candidate === null ||
          (typeof candidate !== "object" && typeof candidate !== "function")
        ) {
          return true;
        }

        break;
      }

      case "scalar": {
        if (
          typeof candidate === "string" ||
          typeof candidate === "number" ||
          typeof candidate === "boolean" ||
          typeof candidate === "bigint"
        ) {
          return true;
        }

        break;
      }

      case "numeric": {
        if (typeof candidate === "number" || typeof candidate === "bigint") {
          return true;
        }

        break;
      }

      case "container": {
        if (
          typeof candidate === "function" ||
          (typeof candidate === "object" && candidate !== null)
        ) {
          return true;
        }

        break;
      }

      case "unknown": {
        return true;
      }

      default: {
        throw new TypeError(`Unknown type name: ${String(type)}.`);
      }
    }
  }

  return false;
}
