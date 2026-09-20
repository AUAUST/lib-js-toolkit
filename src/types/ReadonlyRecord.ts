export type ReadonlyRecord<K extends PropertyKey, T> = {
  readonly [P in K]: T;
};
