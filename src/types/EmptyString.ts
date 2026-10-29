import type { Whitespace } from "#types/Whitespace";

export type EmptyString<Value extends string = string> = Value extends ""
  ? Value
  : Value extends `${infer First}${infer Rest}`
    ? First extends Whitespace
      ? `${First}${EmptyString<Rest>}`
      : never
    : Value & ("" | `${Whitespace}${string}`);
