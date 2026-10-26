import { plain } from "@auaust/toolkit/plain";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { MappedSource } from "@auaust/toolkit/mappedKeys";
import type { Callee, ObjectKey, ObjectValue } from "@auaust/toolkit/types";

/**
 * Copies transformed enumerable string properties, including inherited ones,
 * into a null-prototype record. Symbols are omitted; arrays produce index records.
 */
export function mappedValues<Source>(
  source: Source,
  transformer?: undefined,
): MappedSource<Source, false>;
export function mappedValues<Source extends object, Return>(
  source: Source,
  transformer: Callee<
    Return,
    [
      value: ObjectValue<Source>,
      key: ObjectKey<Source>,
      sourceKey: ObjectKey<Source>,
    ]
  >,
): { [Key in keyof MappedSource<Source, false>]: Return };
export function mappedValues(
  source: Record<string, any>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function mappedValues(
  source: any,
  transform: Callee = (value) => value,
) {
  if (!transform) {
    return plain(source);
  }

  const result = plain();

  const transformer = resolveCallable(transform);

  for (const key in source) {
    result[key] = transformer(source[key], key, key);
  }

  return result;
}
