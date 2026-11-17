import { expect, test } from "vitest";

import { randomIntegerIterator } from "@auaust/toolkit/random";

import { expectIntegersInRange } from "#tests/testutils/expectIntegersInRange";

test("yields integers within bounds lazily", () => {
  const values = randomIntegerIterator(1, 6).take(5).toArray();

  expect(values).toHaveLength(5);
  expectIntegersInRange(values, 1, 6);
});

test("rejects bad bounds before any pull", () => {
  expect(() => randomIntegerIterator(1.5, 2)).toThrow(RangeError);
});
