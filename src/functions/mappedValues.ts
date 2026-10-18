import { call } from "@auaust/toolkit/call";
import { plain } from "@auaust/toolkit/plain";
import type { Callee } from "@auaust/toolkit/types";

export function mappedValues<Source>(source: Source): Source;
export function mappedValues<Source extends object, Return>(
  source: Source,
  transformer: Callee<Return, [
    value: Source[keyof Source],
    key: keyof Source,
    /** @internal */
    sourceKey: keyof Source,
  ]>,
): { [Key in keyof Source]: Return };
export function mappedValues(
  source: Record<string, any>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function mappedValues(
  source: any,
  transformer: Callee = (value) => value,
) {
  if (!transformer) {
    return source;
  }

  const result: Record<PropertyKey, unknown> = plain();

  for (const key in source) {
    result[key] = call(transformer, source[key], key, key);
  }

  return result;
}
