import { describe, expect, expectTypeOf, test } from "vitest";

import { isFunction } from "@auaust/toolkit/guard";

import {
  createFunctions,
  createObjects,
  primitiveValues,
} from "#tests/fixtures/values";

describe("isFunction", () => {
  test.for(createFunctions())("recognizes function %s", (input) => {
    expect(isFunction(input)).toBe(true);
    expectTypeOf(isFunction(input)).toEqualTypeOf<boolean>();
  });

  test.for([...primitiveValues, ...createObjects()])(
    "rejects non-callable %s",
    (input) => {
      expect(isFunction(input)).toBe(false);
    },
  );

  test("takes the candidate only", () => {
    expectTypeOf(isFunction).parameters.toEqualTypeOf<[candidate: unknown]>();
  });
});
