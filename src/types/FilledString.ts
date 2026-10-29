import type { Whitespace } from "#types/Whitespace";

/** String members that can contain non-whitespace characters. */
export type FilledString<Value extends string = string> = Value extends ""
  ? never
  : Value extends `${Whitespace}${infer Rest}`
    ? FilledString<Rest> extends never
      ? never
      : Value
    : Value;
