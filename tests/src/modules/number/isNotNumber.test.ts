import { expect, expectTypeOf, test } from "vitest";

import { isNotNumber } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

test.for(createValues())("detects non-numbers on case %#", (value) => {
  expect(isNotNumber(value)).toBe(typeof value !== "number");
});

test("narrows both branches", () => {
  function narrow(candidate: string | number) {
    if (isNotNumber(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<number>();
    }
  }

  function narrowUnknown(candidate: unknown) {
    if (isNotNumber(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<unknown>();
    }
  }

  narrow(1);
  narrow("a");
  narrowUnknown(null);
  expect(isNotNumber(NaN)).toBe(false);
});
