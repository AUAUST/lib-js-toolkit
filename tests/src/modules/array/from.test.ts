import { expect, expectTypeOf, test } from "vitest";

import { from } from "@auaust/toolkit/array";

test("copies iterables and array-likes", () => {
  const result = from(new Set([1]));

  expect(result).toEqual([1]);
  expectTypeOf(result).toEqualTypeOf<number[]>();
  expect(from({ length: 2 }, (_, index) => index)).toEqual([0, 1]);
});

test("copies arrays", () => {
  const array = [1, 2];
  const result = from(array);

  expect(result).toEqual(array);
  expect(result).not.toBe(array);
});
