import type { KeyAsString } from "@auaust/toolkit/types";

export type ObjectKey<Target> = Target extends readonly unknown[] | string
  ? `${number}`
  : Target extends object
    ? KeyAsString<Target>
    : never;
