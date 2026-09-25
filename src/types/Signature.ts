export type Signature<T> = T extends (
  this: infer This,
  ...args: infer Args
) => infer Return
  ? (this: This, ...args: Args) => Return
  : never;
