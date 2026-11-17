import { unreachable } from "#modules/function/utils/unreachable";

const buffer = new Uint32Array(1);

/**
 * Returns an integer in [0, 2 ** 32). Draws from the host's cryptographically
 * secure generator (`crypto.getRandomValues`), with no guarantee beyond
 * the host's.
 */
// @debt Wraps `crypto.getRandomValues` like `internals/uint32Source`; it could draw from a one-value source instead.
export function randomUint32(): number {
  crypto.getRandomValues(buffer);

  return buffer[0] ?? unreachable("The random buffer is empty.");
}
