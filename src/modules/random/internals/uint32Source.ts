import { UnreachableError } from "#errors/UnreachableError";
import { fail } from "#modules/function/utils/fail";

const maxSize = 16_384;

export function uint32Source(size: number): () => number {
  const buffer = new Uint32Array(Math.max(1, Math.min(size, maxSize)));

  let index = buffer.length;

  return () => {
    if (index >= buffer.length) {
      crypto.getRandomValues(buffer);
      index = 0;
    }

    return (
      buffer[index++] ?? fail(UnreachableError, "The random buffer is empty.")
    );
  };
}
