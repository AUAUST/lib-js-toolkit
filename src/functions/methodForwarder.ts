import { isPropertyKey } from "@auaust/primitive-kit/primitives";
import type { Methods } from "~/types/Methods";

export type MethodForwardingInput<Method extends PropertyKey> =
  | Method
  | MethodForwardingOptions<Method>;

export interface MethodForwarder<
  Source extends object = any,
  Method extends keyof Methods<Source> = keyof Methods<Source>,
> {
  name: Method;
  get(): Source[Method];
  configurable?: boolean;
  enumerable?: boolean;
}

export interface MethodForwardingOptions<
  Method extends PropertyKey = PropertyKey,
> {
  method: Method;
  configurable?: boolean;
  enumerable?: boolean;
}

export function methodForwarder<
  const Source extends object,
  const Method extends keyof Methods<Source>,
>(
  source: Source,
  method: MethodForwardingInput<Method>,
): MethodForwarder<Source, Method>;
export function methodForwarder<
  const Source extends object,
  const Method extends keyof Methods<Source>,
>(
  source: Source,
  method: Method,
  options?: Omit<MethodForwardingOptions<Method>, "method">,
): MethodForwarder<Source, Method>;
export function methodForwarder(
  source: any,
  method: MethodForwardingInput<PropertyKey>,
  options?: Partial<MethodForwardingOptions>,
): MethodForwarder<any, any> {
  if (!isPropertyKey(method)) {
    options = method;
    method = options.method!;
  }

  const descriptor = Object.getOwnPropertyDescriptor(source, method);

  const {
    configurable = descriptor?.configurable ?? true,
    enumerable = descriptor?.enumerable ?? false,
  } = options ?? {};

  const forwarders = new WeakMap<object, (...args: unknown[]) => unknown>();

  return {
    name: method,
    configurable,
    enumerable,
    get() {
      const receiver = this;

      let forwarder = forwarders.get(receiver);

      if (!forwarder) {
        forwarder = function (this: unknown, ...args: unknown[]) {
          return Reflect.apply(
            Reflect.get(source, method, source),
            this == null || this === receiver ? source : this,
            args,
          );
        };

        forwarders.set(receiver, forwarder);
      }

      return forwarder;
    },
  };
}
