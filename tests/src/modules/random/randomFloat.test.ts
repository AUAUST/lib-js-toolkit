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
  [-Number.MAX_VALUE, Number.MAX_VALUE],
  [-Number.MAX_VALUE, Number.MAX_VALUE / 2],
  [-Number.MAX_VALUE / 2, Number.MAX_VALUE],
])("keeps extreme finite bounds in range: %s, %s", (min, max) => {
  mockRandomWords(
    0,
    0,
    0x40000000,
    0,
    0x80000000,
    0,
    0xc0000000,
    0,
    0xffffffff,
    0xffffffff,
  );

  const values = Array.from({ length: 5 }, () => randomFloat(min, max));

  expect(values[0]).toBe(min);

  for (const value of values) {
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThan(max);
  }

  expect(values[2]).toBe(min / 2 + max / 2);
  expect(values[1]).toBeLessThan(values[2]);
  expect(values[2]).toBeLessThan(values[3]);
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
