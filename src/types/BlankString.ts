import type { Whitespace } from "#types/Whitespace";

export type BlankString<Value extends string = string> = Value extends ""
  ? Value
  : Value extends `${infer First}${infer Rest}`
    ? First extends Whitespace
      ? `${First}${BlankString<Rest>}`
      : never
    : Value & ("" | `${Whitespace}${string}`);
