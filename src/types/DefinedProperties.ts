import type {
  DescriptorValue,
  PropertyValue,
  Simplify,
} from "@auaust/toolkit/types";

type WritableDescriptorKey<Descriptors extends PropertyDescriptorMap> = {
  [Key in keyof Descriptors]: PropertyDescriptor extends Descriptors[Key]
    ? Key
    : Descriptors[Key] extends
          | { writable: true }
          | { set: (...args: any[]) => any }
      ? Key
      : never;
}[keyof Descriptors];

export type DefinedProperties<
  Descriptors extends PropertyDescriptorMap,
  Target = {},
> = Simplify<
  {
    -readonly [Key in keyof Descriptors as Key extends WritableDescriptorKey<Descriptors>
      ? Key
      : never]: DescriptorValue<Descriptors[Key], PropertyValue<Target, Key>>;
  } & {
    readonly [Key in keyof Descriptors as Key extends WritableDescriptorKey<Descriptors>
      ? never
      : Key]: DescriptorValue<Descriptors[Key], PropertyValue<Target, Key>>;
  }
>;
