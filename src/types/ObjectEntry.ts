import type { ToRecordKey } from "@auaust/toolkit/types";

export type ObjectEntry<Target> = Target extends readonly (infer Value)[]
  ? [`${number}`, Value]
  : Target extends string
    ? [`${number}`, string]
    : Target extends object
      ? {
          [Key in keyof Target]-?: Key extends string | number
            ? [ToRecordKey<Key>, Target[Key]]
            : never;
        }[keyof Target]
      : never;
