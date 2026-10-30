import type { DescriptorValue } from "#types/DescriptorValue";
import type { PropertyDescriptor } from "#types/PropertyDescriptor";
import type { PropertyValue } from "#types/PropertyValue";
import type { Simplify } from "#types/Simplify";

type WritableDescriptorKey<
  Descriptors extends Record<PropertyKey, PropertyDescriptor>,
> = {
  [Key in keyof Descriptors]: PropertyDescriptor extends Descriptors[Key]
    ? Key
    : Descriptors[Key] extends { writable: true } | { set(...args: any[]): any }
      ? Key
      : never;
}[keyof Descriptors];

export type DefinedProperties<
  Descriptors extends Record<PropertyKey, PropertyDescriptor>,
  Target = {},
> = Simplify<
  {
    -readonly [
      Key in keyof Descriptors as Key extends WritableDescriptorKey<Descriptors>
        ? Key
        : never
    ]: DescriptorValue<Descriptors[Key], PropertyValue<Target, Key>>;
  } & {
    readonly [
      Key in keyof Descriptors as Key extends WritableDescriptorKey<Descriptors>
        ? never
        : Key
    ]: DescriptorValue<Descriptors[Key], PropertyValue<Target, Key>>;
  }
>;
