/* eslint-disable auaust/no-is-undefined */

import { describe, expect, expectTypeOf, test } from "vitest";

import { isUndefined } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isUndefined", () => {
  test.for(createValues())(
    "classifies case %# (%s) and narrows its type",
    (value) => {
      const input: unknown = value;
      const expected = input === undefined;

      expect(isUndefined(input)).toBe(expected);

      expectTypeOf(createValues().filter(isUndefined)).toEqualTypeOf<
        undefined[]
      >();

      if (isUndefined(input)) {
        expectTypeOf(input).toEqualTypeOf<undefined>();
      }
    },
  );
});
