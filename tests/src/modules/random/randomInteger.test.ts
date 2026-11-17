import { afterEach, expect, test, vi } from "vitest";

import { randomInteger } from "@auaust/toolkit/random";

import { expectIntegersInRange } from "#tests/testutils/expectIntegersInRange";
import { mockRandomWords } from "#tests/testutils/mockRandomWords";

afterEach(() => {
  vi.restoreAllMocks();
});

test("rejects biased words and reaches both bounds", () => {
  const spy = mockRandomWords(0xffffffff, 0, 5, 3, 0);

  expect(randomInteger(1, 6)).toBe(1);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(randomInteger(1, 6)).toBe(6);
  expect(randomInteger(1, 6)).toBe(4);
  expect(randomInteger(5, 5)).toBe(5);
});

test("samples ranges larger than 32 bits", () => {
  mockRandomWords(0, 0, 0x800, 0);

  expect(randomInteger(0, 2 ** 32)).toBe(0);
  expect(randomInteger(0, 2 ** 32)).toBe(2 ** 32);
});

test.each([
  [1.5, 2],
  [0, 1.5],
  [NaN, 2],
  [0, NaN],
  [-Infinity, 0],
  [0, Infinity],
  [2, 1],
  [-1, Number.MAX_SAFE_INTEGER],
])("rejects invalid bounds %s, %s", (min, max) => {
  expect(() => randomInteger(min, max)).toThrow(RangeError);
});

test("produces integers within bounds without mocks", () => {
  const values = Array.from({ length: 1000 }, () => randomInteger(0, 9));

  expectIntegersInRange(values, 0, 9);
});
