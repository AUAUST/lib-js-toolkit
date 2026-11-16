import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { ownDescriptor } from "#modules/object/utils/ownDescriptor";
import type { ForwardAs } from "#modules/forwarder/utils/forwardAs";
import type { MethodName } from "#types/MethodName";

export type MethodForwardingInput<
  Method extends PropertyKey,
  Alias extends PropertyKey = never,
> =
  | Method
  | MethodForwardingOptions<Method, Alias>
  | ForwardAs<Method, PropertyKey>;

export type AnyMethodForwarder =
  | MethodForwarder<any, any, PropertyKey>
  | KeyMethodForwarder<PropertyKey, PropertyKey, PropertyKey>;

export interface MethodForwarder<
  Source extends object = any,
  Method extends MethodName<Source> = MethodName<Source>,
  Name extends PropertyKey = Method,
> {
  kind: "method";
  name: Name;
  get(): Source[Method];
  configurable?: boolean;
  enumerable?: boolean;
}

/**
 * A method forwarder whose source is the `sourceKey` property of the object it
 * is defined on, resolved on every call.
 */
export interface KeyMethodForwarder<
  SourceKey extends PropertyKey = PropertyKey,
  Method extends PropertyKey = PropertyKey,
  Name extends PropertyKey = Method,
> {
  kind: "method";
  name: Name;
  sourceKey: SourceKey;
  method: Method;
  get(this: object): (...args: any[]) => unknown;
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

export type ForwardedMethod<
  Forward extends AnyMethodForwarder,
  Target extends object = object,
> = Forward extends KeyMethodForwarder<
  infer SourceKey,
  infer Method,
  infer Name
>
  ? SourceKey extends keyof Target
    ? Method extends keyof Target[SourceKey]
      ? { [K in Name]: Target[SourceKey][Method] }
      : never
    : never
  : Forward extends MethodForwarder<infer Source, infer Method, infer Name>
    ? { [K in Name]: Source[Method] }
    : never;

/**
 * Creates a descriptor forwarding a method of `source` under `name`, `as` or the
 * method's own name. A property key `source` names a property of the object the
 * forwarder is defined on: it is read on every call, so replacing it swaps the
 * source. The method runs with the source as `this`, unless called on another
 * object than the one it is defined on.
 *
 * Defaults `configurable` and `enumerable` to those of an object source's own
 * member, otherwise to `true` and `false`.
 *
 * @throws {TypeError} When a key source resolves to `null` or `undefined`
 * at call time.
 */
export function methodForwarder<
  const Source extends object,
  const Method extends MethodName<Source>,
  const Alias extends PropertyKey = never,
>(
  source: Source,
  method: Method | MethodForwardingOptions<Method, Alias>,
): MethodForwarder<Source, Method, [Alias] extends [never] ? Method : Alias>;
export function methodForwarder<
  const Source extends object,
  const Method extends MethodName<Source>,
  const Alias extends PropertyKey,
>(
  source: Source,
  method: ForwardAs<Method, Alias>,
  options?: Omit<MethodForwardingOptions<Method>, "method" | "as">,
): MethodForwarder<Source, Method, Alias>;
export function methodForwarder<
  const Source extends object,
  const Method extends MethodName<Source>,
  const Alias extends PropertyKey = never,
>(
  source: Source,
  method: Method,
  options?: Omit<MethodForwardingOptions<Method, Alias>, "method">,
): MethodForwarder<Source, Method, [Alias] extends [never] ? Method : Alias>;
export function methodForwarder<
  const SourceKey extends PropertyKey,
  const Method extends PropertyKey,
  const Alias extends PropertyKey = never,
>(
  source: SourceKey,
  method: Method | MethodForwardingOptions<Method, Alias>,
): KeyMethodForwarder<
  SourceKey,
  Method,
  [Alias] extends [never] ? Method : Alias
>;
export function methodForwarder<
  const SourceKey extends PropertyKey,
  const Method extends PropertyKey,
  const Alias extends PropertyKey,
>(
  source: SourceKey,
  method: ForwardAs<Method, Alias>,
  options?: Omit<MethodForwardingOptions<Method>, "method" | "as">,
): KeyMethodForwarder<SourceKey, Method, Alias>;
export function methodForwarder<
  const SourceKey extends PropertyKey,
  const Method extends PropertyKey,
  const Alias extends PropertyKey = never,
>(
  source: SourceKey,
  method: Method,
  options?: Omit<MethodForwardingOptions<Method, Alias>, "method">,
): KeyMethodForwarder<
  SourceKey,
  Method,
  [Alias] extends [never] ? Method : Alias
>;
export function methodForwarder(
  source: any,
  method: MethodForwardingInput<PropertyKey>,
  options?: Record<PropertyKey, any>,
): AnyMethodForwarder {
  let targetMethod: PropertyKey;

  if (!isPropertyKey(method)) {
    const input = method as Record<PropertyKey, any>;

    method = input.method ?? input.property;
    targetMethod = input.as ?? method;

    options = {
      ...input,
      ...options,
    };
  } else {
    targetMethod = options?.as ?? method;
  }

  const sourceMethod = method as PropertyKey;

  const isKeySource = isPropertyKey(source);

  const descriptor = isKeySource
    ? undefined
    : ownDescriptor(source, sourceMethod);

  const {
    configurable = descriptor?.configurable ?? true,
    enumerable = descriptor?.enumerable ?? false,
  } = options ?? {};

  const forwarders = new WeakMap<object, (...args: unknown[]) => unknown>();

  function createForwarder(receiver: object) {
    return function forwarder(this: unknown, ...args: unknown[]) {
      const resolved = isKeySource ? Reflect.get(receiver, source) : source;

      return Reflect.apply(
        resolved[sourceMethod],
        this == null || this === receiver ? resolved : this,
        args,
      );
    };
  }

  function get(this: object) {
    let forwarder = forwarders.get(this);

    if (!forwarder) {
      forwarder = createForwarder(this);
      forwarders.set(this, forwarder);
    }

    return forwarder;
  }

  if (isKeySource) {
    return {
      kind: "method",
      name: targetMethod,
      sourceKey: source,
      method: sourceMethod,
      configurable,
      enumerable,
      get,
    };
  }

  return {
    kind: "method",
    name: targetMethod,
    configurable,
    enumerable,
    get,
  };
}
