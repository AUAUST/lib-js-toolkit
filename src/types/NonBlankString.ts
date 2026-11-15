import type { Whitespace } from "#types/Whitespace";

/**
 * String members that can contain non-whitespace characters.
 */
export type NonBlankString<Value extends string = string> = Value extends ""
  ? never
  : Value extends `${Whitespace}${infer Rest}`
    ? NonBlankString<Rest> extends never
      ? never
      : Value
    : Value;
