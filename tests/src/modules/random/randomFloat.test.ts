import { afterEach, expect, test, vi } from "vitest";

import { randomFloat } from "@auaust/toolkit/random";

import { mockRandomWords } from "#tests/testutils/mockRandomWords";

afterEach(() => {
  vi.restoreAllMocks();
});

test("accepts fractional and equal bounds", () => {
  mockRandomWords(0, 0, 0x80000000, 0);

  expect(randomFloat(1.5, 2.5)).toBe(1.5);
  expect(randomFloat(1.5, 2.5)).toBe(2);
  expect(randomFloat(1.5, 1.5)).toBe(1.5);
});

test("returns min if the result rounds to max", () => {
  mockRandomWords(0xffffffff, 0xffffffff);

  expect(randomFloat(1, 1 + Number.EPSILON)).toBe(1);
});

test.each([
  [NaN, 2],
  [0, NaN],
  [-Infinity, 0],
  [0, Infinity],
  [2, 1],
])("rejects invalid bounds %s, %s", (min, max) => {
  expect(() => randomFloat(min, max)).toThrow(RangeError);
});
