import { UnreachableError } from "#errors/UnreachableError";

/**
 * Throws `UnreachableError`. Passing the narrowed value makes a missing case a
 * type error, as in an exhaustive `default: return unreachable(kind)`.
 *
 * @throws {UnreachableError} on every call.
 * @root
 */
export function unreachable(value?: never, message?: string): never {
  throw new UnreachableError(message);
}
