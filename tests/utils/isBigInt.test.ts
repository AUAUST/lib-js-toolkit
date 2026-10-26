import { describe, expect, expectTypeOf, test } from "vitest";

import { isBigInt } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isBigInt", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = typeof input === "bigint";

      expect(isBigInt(input)).toBe(expected);
      expectTypeOf(createValues().filter(isBigInt)).toEqualTypeOf<bigint[]>();

      if (isBigInt(input)) {
        expectTypeOf(input).toEqualTypeOf<bigint>();
      }
    },
  );
});
