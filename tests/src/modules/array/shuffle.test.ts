import { describe, expect, test } from "vitest";

import { shuffle } from "@auaust/toolkit/array";

describe("shuffle", () => {
  test("keeps the same array and its items", () => {
    const array = [1, 2, 3, 4, 5];
    const result = shuffle(array);

    expect(result).toBe(array);
    expect(result.toSorted()).toEqual([1, 2, 3, 4, 5]);
  });

  test("gives an empty array for an empty array", () => {
    expect(shuffle([])).toEqual([]);
  });
});
