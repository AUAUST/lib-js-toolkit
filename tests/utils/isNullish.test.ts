import { describe, expect, expectTypeOf, test } from "vitest";

import { isNullish } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isNullish", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = input == null;

      expect(isNullish(input)).toBe(expected);

      expectTypeOf(createValues().filter(isNullish)).toEqualTypeOf<
        (null | undefined)[]
      >();

      if (isNullish(input)) {
        expectTypeOf(input).toEqualTypeOf<null | undefined>();
      }
    },
  );
});
