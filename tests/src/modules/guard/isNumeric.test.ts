import { describe, expect, expectTypeOf, test } from "vitest";

import { isNumeric } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

describe("isNumeric", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const type = typeof input;
      const expected = type === "number" || type === "bigint";

      expect(isNumeric(input)).toBe(expected);

      if (isNumeric(input)) {
        expectTypeOf(input).toEqualTypeOf<number | bigint>();
      }
    },
  );
});
