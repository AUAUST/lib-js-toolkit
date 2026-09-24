import { plain } from "@auaust/toolkit/plain";

export function mappedValues<Source>(source: Source): Source;
export function mappedValues<Source extends object, Result>(
  source: Source,
  transformer: (
    value: Source[keyof Source],
    key: keyof Source,
    /** @internal */
    sourceKey: keyof Source,
  ) => Result,
): { [Key in keyof Source]: Result };
export function mappedValues(
  source: Record<string, any>,
  transformer?: (value: any, key: PropertyKey, sourceKey: string) => any,
): Record<string, any>;
export function mappedValues(
  source: any,
  transformer: (...args: any[]) => any = (value) => value,
) {
  if (!transformer) {
    return source;
  }

  const result: Record<PropertyKey, unknown> = plain();

  for (const key in source) {
    result[key] = transformer(source[key], key, key);
  }

  return result;
}
