import { uint32Source } from "#modules/random/internals/uint32Source";

const draw = uint32Source(() => 1);

/**
 * Returns an integer in [0, 2 ** 32). Draws from the host's cryptographically
 * secure generator (`crypto.getRandomValues`), with no guarantee beyond
 * the host's.
 */
export function randomUint32(): number {
  return draw();
}
