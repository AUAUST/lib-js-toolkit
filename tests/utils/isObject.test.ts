import { isObject } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";
import { createValues } from "../fixtures/values";

describe("isObject", () => {
  test.for(createValues())("classifies case %# (%s) and narrows its type", (value) => {
    const input: unknown = value;
    const expected = typeof input === "object" && input !== null;

    expect(isObject(input)).toBe(expected);
    expectTypeOf(createValues().filter(isObject)).toEqualTypeOf<object[]>();

    if (isObject(input)) {
      expectTypeOf(input).toEqualTypeOf<object>();
    }
  });
});
