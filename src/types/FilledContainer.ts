/** Possible nonempty containers, preserving readonly and tuple contracts. */
export type FilledContainer<Value> = Value extends readonly unknown[]
  ? Value extends readonly []
    ? never
    : 0 extends Value["length"]
      ? Value extends unknown[]
        ? [Value[number], ...Value[number][]]
        : readonly [Value[number], ...Value[number][]]
      : Value
  : Value extends ReadonlyMap<unknown, never> | ReadonlySet<never>
    ? never
    : Value extends (...args: any[]) => any
      ? Value
      : Value extends { length: number }
        ? Value extends { length: 0 }
          ? never
          : Value
        : Value extends { size: 0 }
          ? never
          : Value;
