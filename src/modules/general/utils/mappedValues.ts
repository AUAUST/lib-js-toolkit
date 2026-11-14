import { isArray } from "#modules/array/guards/isArray";
import { resolveCallable } from "#modules/function/utils/resolveCallable";
import { plain } from "#modules/general/utils/plain";
import { isContainer } from "#modules/guard/guards/isContainer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { MappedSource } from "#modules/general/utils/mappedKeys";
import type { Callee } from "#types/Callee";
import type { ObjectKey } from "#types/ObjectKey";
import type { ObjectValue } from "#types/ObjectValue";

/**
 * Copies every own string and symbol property, including non-enumerable ones,
 * into a null-prototype record of writable transformed values. Inherited object
 * properties are excluded. Arrays and strings produce indexed records.
 */
export function mappedValues<Source extends readonly unknown[] | string>(
  source: Source,
  transformer?: undefined,
): MappedSource<Source, false>;
export function mappedValues<Source extends object>(
  source: Source,
  transformer?: undefined,
): { [Key in keyof Source]: Source[Key] };
export function mappedValues<Source>(
  source: Source,
  transformer?: undefined,
): MappedSource<Source, false>;
export function mappedValues<
  Source extends readonly unknown[] | string,
  Return,
>(
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
export function mappedValues<Source extends object, Return>(
  source: Source,
  transformer: Callee<
    Return,
    [value: Source[keyof Source], key: keyof Source, sourceKey: keyof Source]
  >,
): { -readonly [Key in keyof Source]: Return };
export function mappedValues(
  source: Record<string, any>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function mappedValues(
  source: any,
  transform: Callee = (value) => value,
) {
  const objectSource = isContainer(source) && !isArray(source);

  if (!transform && !objectSource) {
    return plain(source);
  }

  const result = plain<Record<PropertyKey, any>>();

  const transformer = resolveCallable(transform || ((value) => value));

  if (objectSource) {
    for (const key of ownKeys(source)) {
      result[key] = transformer(source[key], key, key);
    }

    return result;
  }

  for (const key in source) {
    result[key] = transformer(source[key], key, key);
  }

  return result;
}
