import { expect, expectTypeOf, test } from "vitest";

import { b, toBoolean } from "@auaust/toolkit/boolean";

import {
  createFunctions,
  createObjects,
  falsyValues,
  truthyPrimitives,
} from "#tests/fixtures/values";

test.for(falsyValues)("converts falsy case %# to false", (input) => {
  expect(toBoolean(input)).toBe(false);
});

test.for([
  ...truthyPrimitives,
  ...createObjects(),
  ...createFunctions(),
  [],
  {},
])("converts truthy case %# to true", (input) => {
  expect(toBoolean(input)).toBe(true);
});

test("is the shorthand and a callback", () => {
  expect(b).toBe(toBoolean);
  expect([0, 1, "", "a"].filter(toBoolean)).toEqual([1, "a"]);
  expectTypeOf(toBoolean(1)).toEqualTypeOf<boolean>();
  expectTypeOf(toBoolean(true)).toEqualTypeOf<true>();
  expectTypeOf(toBoolean<boolean>(false)).toEqualTypeOf<boolean>();
});
