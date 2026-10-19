import type { Whitespace } from "@auaust/toolkit/types";

export type EmptyString<Value extends string = string> = Value extends ""
  ? Value
  : Value extends `${infer First}${infer Rest}`
    ? First extends Whitespace
      ? `${First}${EmptyString<Rest>}`
      : never
    : Value & ("" | `${Whitespace}${string}`);
