import type { KeyAsString } from "#types/KeyAsString";

export type ObjectKey<Target> = Target extends readonly unknown[] | string
  ? `${number}`
  : Target extends object
    ? KeyAsString<Target>
    : never;
