export type Signature<T> = T extends (
  this: infer This,
  ...args: infer Arguments
) => infer Return
  ? (this: This, ...args: Arguments) => Return
  : never;
