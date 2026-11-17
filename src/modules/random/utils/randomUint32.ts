import { UnreachableError } from "#errors/UnreachableError";
import { fail } from "#modules/function/utils/fail";

const buffer = new Uint32Array(1);

/**
 * Returns an integer in [0, 2 ** 32). Draws from the host's cryptographically
 * secure generator (`crypto.getRandomValues`), with no guarantee beyond
 * the host's.
 */
export function randomUint32(): number {
  crypto.getRandomValues(buffer);

  return buffer[0] ?? fail(UnreachableError, "The random buffer is empty.");
}
