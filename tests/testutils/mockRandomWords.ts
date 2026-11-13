import { vi } from "vitest";

export function mockRandomWords(...words: number[]) {
  return vi
    .spyOn(globalThis.crypto, "getRandomValues")
    .mockImplementation((array) => {
      if (!(array instanceof Uint32Array)) {
        throw new TypeError("Expected a Uint32Array.");
      }

      const word = words.shift();

      if (word === undefined) {
        throw new Error("The random word queue is empty.");
      }

      array[0] = word;

      return array;
    });
}
