import { isPlainObject } from "#modules/object/guards/isPlainObject";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";

/**
 * Resolves an options object or its canonical `field` value alone into the
 * options object: `{}` for `undefined`, the value itself when it is a plain
 * object, otherwise `{ [field]: value }`.
 */
export function resolveOptions<Options, Field extends keyof Options>(
  value: OptionsOrField<Options, Field> | undefined,
  field: Field,
): Options {
  // @debt the casts hold only while every field of `Options` is optional and no canonical field accepts a plain object
  if (value === undefined) {
    return {} as Options;
  }

  if (isPlainObject(value)) {
    return value as Options;
  }

  return { [field]: value } as Options;
}
