import { describe, expect, expectTypeOf, test } from "vitest";

import { isRegisteredSymbol } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("isRegisteredSymbol", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;

      const expected =
        typeof input === "symbol" && Symbol.keyFor(input) !== undefined;

      expect(isRegisteredSymbol(input)).toBe(expected);
      expectTypeOf(createValues().filter(isRegisteredSymbol)).toEqualTypeOf<
        symbol[]
      >();

      if (isRegisteredSymbol(input)) {
        expectTypeOf(input).toEqualTypeOf<symbol>();
      }
    },
  );
});
