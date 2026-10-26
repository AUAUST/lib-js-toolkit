import { describe, expect, expectTypeOf, test } from "vitest";

import { isNull } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isNull", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = input === null;

      expect(isNull(input)).toBe(expected);
      expectTypeOf(createValues().filter(isNull)).toEqualTypeOf<null[]>();

      if (isNull(input)) {
        expectTypeOf(input).toEqualTypeOf<null>();
      }
    },
  );
});
