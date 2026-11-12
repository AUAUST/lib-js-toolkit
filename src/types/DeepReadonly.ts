export type DeepReadonly<T> = T extends infer V
  ? V extends object
    ? V extends (infer U)[]
      ? U extends object
        ? readonly DeepReadonly<U>[]
        : readonly U[]
      : {
          readonly [K in keyof V]: V[K] extends object
            ? DeepReadonly<V[K]>
            : V[K];
        }
    : never
  : never;
