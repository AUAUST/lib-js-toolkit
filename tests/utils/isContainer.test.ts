import { describe, expect, expectTypeOf, test } from "vitest";

import { isContainer } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isContainer", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected =
        input !== null &&
        (typeof input === "object" || typeof input === "function");

      expect(isContainer(input)).toBe(expected);
      expectTypeOf(createValues().filter(isContainer)).toEqualTypeOf<
        object[]
      >();

      if (isContainer(input)) {
        expectTypeOf(input).toEqualTypeOf<object>();
      }
    },
  );
});
