import type { TypeName } from "#types/TypeName";
import type { TypeNames } from "#types/TypeNames";

function matchesType(candidate: unknown, type: TypeName): boolean {
  switch (type) {
    case "string": {
      return typeof candidate === "string";
    }

    case "number": {
      return typeof candidate === "number";
    }

    case "boolean": {
      return typeof candidate === "boolean";
    }

    case "object": {
      return typeof candidate === "object" && candidate !== null;
    }

    case "array": {
      return Array.isArray(candidate);
    }

    case "function": {
      return typeof candidate === "function";
    }

    case "undefined": {
      return candidate === undefined;
    }

    case "null": {
      return candidate === null;
    }

    case "nullish": {
      return candidate == null;
    }

    case "bigint": {
      return typeof candidate === "bigint";
    }

    case "symbol": {
      return typeof candidate === "symbol";
    }

    case "primitive": {
      return (
        candidate === null ||
        (typeof candidate !== "object" && typeof candidate !== "function")
      );
    }

    case "scalar": {
      return (
        typeof candidate === "string" ||
        typeof candidate === "number" ||
        typeof candidate === "boolean" ||
        typeof candidate === "bigint"
      );
    }

    case "numeric": {
      return typeof candidate === "number" || typeof candidate === "bigint";
    }

    case "container": {
      return (
        typeof candidate === "function" ||
        (typeof candidate === "object" && candidate !== null)
      );
    }

    case "unknown": {
      return true;
    }
  }
}

/**
 * Returns `true` when the candidate matches any of the given type names, testing
 * them in order and stopping at the first match.
 */
export function is<const Names extends readonly TypeName[]>(
  candidate: unknown,
  ...types: Names
): candidate is TypeNames[Names[number]] {
  for (const type of types) {
    if (matchesType(candidate, type)) {
      return true;
    }
  }

  return false;
}
