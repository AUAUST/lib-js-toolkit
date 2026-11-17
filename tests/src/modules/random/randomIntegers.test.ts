import { afterEach, expect, test, vi } from "vitest";

import { randomIntegers } from "@auaust/toolkit/random";

import { expectIntegersInRange } from "#tests/testutils/expectIntegersInRange";

afterEach(() => {
  vi.restoreAllMocks();
});

test("returns count integers within bounds", () => {
  const values = randomIntegers(1, 6, 1000);

  expect(values).toHaveLength(1000);
  expectIntegersInRange(values, 1, 6);
  expect(randomIntegers(1, 6, 0)).toEqual([]);
});

test.each([-1, 1.5])("rejects count %s", (count) => {
  expect(() => randomIntegers(1, 6, count)).toThrow(RangeError);
});

test("rejects bad bounds at call time", () => {
  expect(() => randomIntegers(2, 1, 0)).toThrow(RangeError);
});

test("fills one buffer for many draws", () => {
  const spy = vi.spyOn(crypto, "getRandomValues");

  randomIntegers(0, 9, 100);

  expect(spy.mock.calls.length).toBeGreaterThanOrEqual(1);
  expect(spy.mock.calls.length).toBeLessThanOrEqual(2);
});

test("sizes fills to the words the remaining draws need", () => {
  const sizes: number[] = [];

  vi.spyOn(crypto, "getRandomValues").mockImplementation((array) => {
    if (array instanceof Uint32Array) {
      sizes.push(array.length);
      array.fill(0);

      if (sizes.length === 1) {
        array.fill(2 ** 32 - 1, -1);
      }
    }

    return array;
  });

  randomIntegers(0, 2 ** 31, 4);
  randomIntegers(0, 2 ** 40, 3);

  expect(sizes).toEqual([4, 1, 6]);
});
