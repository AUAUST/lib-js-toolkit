import { plain } from "@auaust/toolkit/plain";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Callee } from "@auaust/toolkit/types";

export function mappedValues<Source>(source: Source): Source;
export function mappedValues<Source extends object, Return>(
  source: Source,
  transformer: Callee<
    Return,
    [
      value: Source[keyof Source],
      key: keyof Source,
      /** @internal */
      sourceKey: keyof Source,
    ]
  >,
): { [Key in keyof Source]: Return };
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
