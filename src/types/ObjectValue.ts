export type ObjectValue<Target> = Target extends readonly (infer Value)[]
  ? Value
  : Target extends string
    ? string
    : Target extends object
      ? [Extract<keyof Target, string | number>] extends [never]
        ? never
        : Target[Extract<keyof Target, string | number>]
      : never;
