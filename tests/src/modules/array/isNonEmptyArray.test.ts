import { describe, expect, expectTypeOf, test } from "vitest";

import { isNonEmptyArray } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

describe("isNonEmptyArray", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const input: unknown = value;

    expect(isNonEmptyArray(input)).toBe(
      Array.isArray(input) && input.length > 0,
    );
  });

  test("narrows to a tuple with a first item", () => {
    const items: readonly string[] = ["a"];

    expect(isNonEmptyArray([])).toBe(false);

    if (isNonEmptyArray(items)) {
      expectTypeOf(items).toEqualTypeOf<readonly [string, ...string[]]>();
    }
  });
});
