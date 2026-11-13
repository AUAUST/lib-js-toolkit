import { expect, expectTypeOf, test } from "vitest";

import * as array from "@auaust/toolkit/array";
import * as guard from "@auaust/toolkit/guard";

import { createValues, type FixtureValue } from "#tests/fixtures/values";

test("rejects exactly arrays and shares its guard export", () => {
  expect(guard.isNotArray).toBe(array.isNotArray);

  const values = createValues();
  const filtered = values.filter(array.isNotArray);

  expect(filtered).toEqual(values.filter((value) => !Array.isArray(value)));

  expectTypeOf(filtered).toEqualTypeOf<
    Exclude<FixtureValue, readonly unknown[]>[]
  >();
});

test("excludes mutable and readonly arrays and tuples", () => {
  function narrow(
    candidate: number | string[] | readonly string[] | [1] | readonly [2],
  ) {
    if (array.isNotArray(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<number>();
    }
  }

  function unknown(candidate: unknown) {
    if (array.isNotArray(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<unknown>();
    }
  }

  narrow(1);
  narrow([1]);
  unknown(null);
  expect(array.isNotArray([])).toBe(false);
  expect(array.isNotArray({ length: 0 })).toBe(true);
});
