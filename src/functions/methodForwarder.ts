import type { Methods } from "@auaust/toolkit";
import type { ForwardAs } from "@auaust/toolkit/forwardAs";
import { isPropertyKey } from "@auaust/toolkit/isPropertyKey";

export type MethodForwardingInput<
  Method extends PropertyKey,
  Alias extends PropertyKey = never,
> =
  | Method
  | MethodForwardingOptions<Method, Alias>
  | ForwardAs<Method, PropertyKey>;

export interface MethodForwarder<
  Source extends object = any,
  Method extends keyof Methods<Source> = keyof Methods<Source>,
  Name extends PropertyKey = Method,
> {
  kind: "method";
  name: Name;
  get(): Source[Method];
  configurable?: boolean;
  enumerable?: boolean;
}

export interface MethodForwardingOptions<
  Method extends PropertyKey = PropertyKey,
  Alias extends PropertyKey = never,
> {
  method: Method;
  as?: Alias;
  configurable?: boolean;
  enumerable?: boolean;
}

export type MethodForwarded<Forward extends MethodForwarder> =
  Forward extends MethodForwarder<infer Source, infer Method, infer Name>
    ? { [K in Name]: Source[Method] }
    : never;

export function methodForwarder<
  const Source extends object,
  const Method extends keyof Methods<Source>,
  const Alias extends PropertyKey = never,
>(
  source: Source,
  method: Method | MethodForwardingOptions<Method, Alias>,
): MethodForwarder<Source, Method, [Alias] extends [never] ? Method : Alias>;
export function methodForwarder<
  const Source extends object,
  const Method extends keyof Methods<Source>,
  const Alias extends PropertyKey,
>(
  source: Source,
  method: ForwardAs<Method, Alias>,
  options?: Omit<MethodForwardingOptions<Method, never>, "method" | "as">,
): MethodForwarder<Source, Method, Alias>;
export function methodForwarder<
  const Source extends object,
  const Method extends keyof Methods<Source>,
  const Alias extends PropertyKey = never,
>(
  source: Source,
  method: Method,
  options?: Omit<MethodForwardingOptions<Method, Alias>, "method">,
): MethodForwarder<Source, Method, [Alias] extends [never] ? Method : Alias>;
export function methodForwarder(
  source: any,
  method: MethodForwardingInput<PropertyKey>,
  options?: Record<PropertyKey, any>,
): MethodForwarder<any, any> {
  let targetMethod: PropertyKey;

  if (!isPropertyKey(method)) {
    const input = method as Record<PropertyKey, any>;

    method = input.method ?? input.property;
    targetMethod = input.as ?? method;
    options = { ...input, ...options };
  } else {
    targetMethod = options?.as ?? method;
  }

  const sourceMethod = method as PropertyKey;

  const descriptor = Object.getOwnPropertyDescriptor(source, sourceMethod);

  const {
    configurable = descriptor?.configurable ?? true,
    enumerable = descriptor?.enumerable ?? false,
  } = options ?? {};

  const forwarders = new WeakMap<object, (...args: unknown[]) => unknown>();

  return {
    kind: "method",
    name: targetMethod,
    configurable,
    enumerable,
    get() {
      const receiver = this;

      let forwarder = forwarders.get(receiver);

      if (!forwarder) {
        forwarder = function (this: unknown, ...args: unknown[]) {
          return Reflect.apply(
            Reflect.get(source, sourceMethod, source),
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
