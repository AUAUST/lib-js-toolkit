import { describe, expect, expectTypeOf, test } from "vitest";

import { isBoolean } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isBoolean", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = typeof input === "boolean";

      expect(isBoolean(input)).toBe(expected);
      expectTypeOf(createValues().filter(isBoolean)).toEqualTypeOf<boolean[]>();

      if (isBoolean(input)) {
        expectTypeOf(input).toEqualTypeOf<boolean>();
      }
    },
  );
});
