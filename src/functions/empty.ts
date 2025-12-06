export type EmptyValue =
  | ""
  | []
  | Record<string, never>
  | Map<any, never>
  | Set<never>
  | null
  | undefined;

export function empty<T>(value: T): value is T & EmptyValue {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
}
