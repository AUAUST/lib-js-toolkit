import { unreachable } from "#modules/function/utils/unreachable";

const maxSize = 16_384;

export function uint32Source(fillSize: () => number): () => number {
  let storage = new Uint32Array(0);
  let buffer = storage;
  let index = 0;

  return () => {
    if (index >= buffer.length) {
      const size = Math.max(1, Math.min(fillSize(), maxSize));

      if (size > storage.length) {
        storage = new Uint32Array(size);
      }

      buffer = storage.subarray(0, size);
      crypto.getRandomValues(buffer);
      index = 0;
    }

    return buffer[index++] ?? unreachable("The random buffer is empty.");
  };
}
