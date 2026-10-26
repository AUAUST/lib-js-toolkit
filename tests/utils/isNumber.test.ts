import { describe, expect, expectTypeOf, test } from "vitest";

import { isNumber } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isNumber", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = typeof input === "number";

      expect(isNumber(input)).toBe(expected);
      expectTypeOf(createValues().filter(isNumber)).toEqualTypeOf<number[]>();

      if (isNumber(input)) {
        expectTypeOf(input).toEqualTypeOf<number>();
      }
    },
  );
});
