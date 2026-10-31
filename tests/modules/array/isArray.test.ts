import { describe, expect, expectTypeOf, test } from "vitest";

import { isArray } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isArray", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = Array.isArray(input);

      expect(isArray(input)).toBe(expected);
      expectTypeOf(createValues().filter(isArray)).toEqualTypeOf<any[][]>();

      if (isArray(input)) {
        expectTypeOf(input).toEqualTypeOf<any[]>();
      }
    },
  );
});
