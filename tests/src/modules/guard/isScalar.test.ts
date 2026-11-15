import { describe, expect, expectTypeOf, test } from "vitest";

import { isScalar } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

describe("isScalar", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const type = typeof input;

      const expected = (
        type === "string" ||
        type === "number" ||
        type === "boolean" ||
        type === "bigint"
      );

      expect(isScalar(input)).toBe(expected);

      if (isScalar(input)) {
        expectTypeOf(input).toEqualTypeOf<string | number | boolean | bigint>();
      }
    },
  );
});
