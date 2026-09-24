export type ToRecordKey<Key extends PropertyKey> = Key extends infer K
  ? K extends symbol
    ? K
    : K extends string | number
      ? `${K}`
      : never
  : never;
