import { isFunction } from "#modules/function/guards/isFunction";
import { assign } from "#modules/object/utils/assign";
import { defineGetter } from "#modules/object/utils/defineGetter";
import { get } from "#modules/object/utils/get";
import { callable } from "#modules/protocol/symbols";
import type { Fn } from "#types/Fn";
import type { UnknownFn } from "#types/UnknownFn";

type MethodKey<Target> = {
  [Key in keyof Target]: Target[Key] extends Fn ? Key : never;
}[keyof Target];

/**
 * Makes `object` callable under the `callable` protocol, mutating it. A method
 * name defines the protocol as a getter reading `this[method]` on every access,
 * so replacing the method changes what calling `object` does; it throws a
 * `TypeError` when the member is not a function. A function is assigned as is.
 */
export function defineCallable<
  Target extends object,
  Method extends MethodKey<Target>,
>(
  object: Target,
  method: Method,
): Target & { readonly [callable]: Target[Method] };
export function defineCallable<Target extends object, Closure extends Fn>(
  object: Target,
  closure: Closure,
): Target & { [callable]: Closure };
export function defineCallable(
  object: object,
  member: PropertyKey | UnknownFn,
): object {
  if (isFunction(member)) {
    return assign(object, { [callable]: member });
  }

  const key = member;

  function resolve(this: object): unknown {
    const method: unknown = get(this, key);

    if (!isFunction(method)) {
      throw new TypeError(`${String(key)} is not a function`);
    }

    return method;
  }

  resolve.call(object);

  return defineGetter(object, callable, resolve);
}
