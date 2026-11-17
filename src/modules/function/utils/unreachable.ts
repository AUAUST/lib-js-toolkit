import { UnreachableError } from "#errors/UnreachableError";

/**
 * Throws `UnreachableError` with `message`, or its default message when omitted,
 * at a code path the types cannot rule out.
 *
 * @throws {UnreachableError} on every call.
 * @root
 */
export function unreachable(message?: string): never {
  throw new UnreachableError(message);
}
