export type MaybeArrayElement<Input, Allowed = unknown> = Extract<
  Input extends readonly (infer Element)[] ? Element : Input,
  Allowed
>;
