export type DescriptorValue<
  Descriptor extends PropertyDescriptor,
  Fallback = any,
> = Descriptor extends { get: (...args: any[]) => infer Value }
  ? Value
  : Descriptor extends { value: infer Value }
    ? Value
    : Descriptor extends { set: (value: infer Value) => void }
      ? Value
      : Fallback;
