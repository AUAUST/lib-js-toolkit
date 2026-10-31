import { describe, expect, expectTypeOf, test } from "vitest";

import { isSymbol } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isSymbol", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = typeof input === "symbol";

      expect(isSymbol(input)).toBe(expected);
      expectTypeOf(createValues().filter(isSymbol)).toEqualTypeOf<symbol[]>();

      if (isSymbol(input)) {
        expectTypeOf(input).toEqualTypeOf<symbol>();
      }
    },
  );
});
