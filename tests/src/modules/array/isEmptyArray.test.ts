import { describe, expect, expectTypeOf, test } from "vitest";

import { isEmptyArray } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

describe("isEmptyArray", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const input: unknown = value;

    expect(isEmptyArray(input)).toBe(
      Array.isArray(input) && input.length === 0,
    );
  });

  test("narrows to an empty tuple", () => {
    const items: readonly string[] = [];

    expect(isEmptyArray([1])).toBe(false);

    if (isEmptyArray(items)) {
      expectTypeOf(items).toEqualTypeOf<readonly []>();
    }
  });
});
