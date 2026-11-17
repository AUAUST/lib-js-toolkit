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
