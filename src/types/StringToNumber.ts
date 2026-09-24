export type StringToNumber<T extends string> = T extends infer S
  ? S extends `${infer N extends number}`
    ? N
    : never
  : never;
