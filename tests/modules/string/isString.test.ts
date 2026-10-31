import { describe, expect, expectTypeOf, test } from "vitest";

import { isString } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isString", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = typeof input === "string";

      expect(isString(input)).toBe(expected);
      expectTypeOf(createValues().filter(isString)).toEqualTypeOf<string[]>();

      if (isString(input)) {
        expectTypeOf(input).toEqualTypeOf<string>();
      }
    },
  );
});
