import { describe, expect, test } from "vitest";

import { diamond } from "@auaust/toolkit";

describe("diamond", () => {
  test.each([
    [1, 2, -1],
    [2, 2n, 0],
    ["b", "a", 1],
    [-0, 0, 0],
    [new Date(NaN), new Date(), 0],
    [null, 1, 0],
  ])("diamond(%o, %o) is %i", (left, right, expected) => {
    expect(diamond(left, right)).toBe(expected);
  });

  test("reverses", () => {
    expect(diamond(1, 2, { reverse: true })).toBe(1);
    expect(diamond(1, 1, { reverse: true })).toBe(0);
  });
});
