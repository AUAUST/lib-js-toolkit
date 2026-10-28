import type { DefinedProperties, Extended } from "@auaust/toolkit/types";

interface Create {
  <Prototype extends object | null>(
    prototype: Prototype,
    properties?: undefined,
  ): Prototype extends null ? Record<PropertyKey, any> : Prototype;
  <
    Prototype extends object | null,
    const Descriptors extends PropertyDescriptorMap,
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
    properties?: PropertyDescriptorMap,
  ): Result;
}

export const create: Create = Object.create;
