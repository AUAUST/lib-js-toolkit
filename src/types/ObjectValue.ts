import type { IsNever } from "#types/IsNever";

export type ObjectValue<Target> = Target extends readonly (infer Value)[]
  ? Value
  : Target extends string
    ? string
    : Target extends object
      ? IsNever<
          Extract<keyof Target, string | number>,
          never,
          Target[Extract<keyof Target, string | number>]
        >
      : never;
