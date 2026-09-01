import { isPropertyKey } from "@auaust/primitive-kit/primitives";

export type PropertyDefinition<K extends PropertyKey> = Readonly<{
  property: K;
  readonly?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}>;

export type PropertyDefinitions<H> = readonly {
  [K in keyof H]: PropertyDefinition<K> | K;
}[keyof H][];

type ExtractPropertyKeys<D> = D extends readonly (infer U)[]
  ? U extends PropertyDefinition<infer K>
    ? K
    : U extends PropertyKey
    ? U
    : never
  : never;

export type ForwardProperties<
  T extends object,
  H extends object,
  D extends PropertyDefinitions<H>,
> = T & {
  [K in keyof H as K extends ExtractPropertyKeys<D> ? K : never]: H[K];
};

export function forwardProperties<
  T extends object,
  H extends object,
  const D extends PropertyDefinitions<H>,
>(target: T, handler: H, definitions: D): ForwardProperties<T, H, D> {
  for (const definition of definitions) {
    const { property, readonly, enumerable, configurable } = isPropertyKey(
      definition,
    )
      ? { property: definition }
      : definition;

    if (Object.prototype.hasOwnProperty.call(target, property)) {
      throw new Error(
        `Target object already has a property named ${String(
          property,
        )}. Cannot forward property.`,
      );
    }

    const source = Object.getOwnPropertyDescriptor(handler, property) ?? {};

    const descriptor: PropertyDescriptor = {
      configurable: configurable ?? source.configurable,
      enumerable: enumerable ?? source.enumerable,
      get() {
        return Reflect.get(handler, property, handler);
      },
    };

    const sourceIsWritable = source.writable ?? source.set !== undefined;

    if (!(readonly ?? !sourceIsWritable)) {
      descriptor.set = function (value) {
        if (!Reflect.set(handler, property, value, handler)) {
          throw new TypeError(
            `Unable to set forwarded property ${String(property)}.`,
          );
        }
      };
    }

    Object.defineProperty(target, property, descriptor);
  }

  return target as ForwardProperties<T, H, D>;
}
