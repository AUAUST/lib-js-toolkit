export type DeepReadonly<T> = T extends infer V
  ? V extends object
    ? V extends Array<infer U>
      ? U extends object
        ? ReadonlyArray<DeepReadonly<U>>
        : ReadonlyArray<U>
      : {
          readonly [K in keyof V]: V[K] extends object
            ? DeepReadonly<V[K]>
            : V[K];
        }
    : never
  : never;
