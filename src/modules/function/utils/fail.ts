import { isConstructible } from "#modules/function/guards/isConstructible";
import { thrower } from "#modules/function/utils/thrower";
import type { Constructor } from "#types/Constructor";

/**
 * Throws `new Error(message, options)`. Usable as an expression, as in
 * `value ?? fail("Message.")`.
 *
 * @throws {Error} on every call.
 * @root
 */
export function fail(message?: string, options?: ErrorOptions): never;
/**
 * Throws `new ErrorClass(...args)`, the arguments typed from its constructor.
 * Usable as an expression, as in `value ?? fail(TypeError, "Message.")`.
 *
 * @throws {Error} an instance of `ErrorClass` on every call.
 * @root
 */
export function fail<Args extends readonly unknown[]>(
  ErrorClass: new (...args: Args) => Error,
  ...args: Args
): never;
export function fail(
  messageOrClass?: string | Constructor<Error>,
  options?: ErrorOptions,
  ...args: readonly unknown[]
): never {
  if (isConstructible(messageOrClass)) {
    return thrower(messageOrClass, options, ...args)();
  }

  return thrower(Error, messageOrClass, options)();
}
