import { describe, expect, expectTypeOf, test } from "vitest";

import { isPropertyKey } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isPropertyKey", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = ["string", "number", "symbol"].includes(typeof input);

      expect(isPropertyKey(input)).toBe(expected);
      expectTypeOf(createValues().filter(isPropertyKey)).toEqualTypeOf<
        PropertyKey[]
      >();

      if (isPropertyKey(input)) {
        expectTypeOf(input).toEqualTypeOf<PropertyKey>();
      }
    },
  );
});
