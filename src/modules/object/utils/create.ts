import type { DefinedProperties } from "#types/DefinedProperties";
import type { Extended } from "#types/Extended";
import type { PropertyDescriptor } from "#types/PropertyDescriptor";

interface Create {
  <Prototype extends object | null>(
    prototype: Prototype,
    properties?: undefined,
  ): Prototype extends null ? Record<PropertyKey, any> : Prototype;
  <
    Prototype extends object | null,
    const Descriptors extends Record<PropertyKey, PropertyDescriptor>,
  >(
    prototype: Prototype,
    properties: Descriptors &
      ThisType<
        (Prototype extends object ? Prototype : {}) & Record<PropertyKey, any>
      >,
  ): Extended<
    Prototype extends object ? Prototype : {},
    DefinedProperties<Descriptors>
  >;
  <Result extends object>(
    prototype: object | null,
    properties?: Record<PropertyKey, PropertyDescriptor>,
  ): Result;
}

export const create: Create = Object.create;
