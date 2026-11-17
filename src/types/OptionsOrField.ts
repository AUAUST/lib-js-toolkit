/**
 * An options object, or its canonical `Field` value alone. A value is the
 * options object only when it is a plain object; anything else, arrays and class
 * instances such as `Intl.Locale` included, is the field.
 */
export type OptionsOrField<Options, Field extends keyof Options> =
  | Options
  | NonNullable<Options[Field]>;
