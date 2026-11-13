import { expect, expectTypeOf, test } from "vitest";

import { isNotBoolean } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

test.for(createValues())("detects non-booleans on case %#", (value) => {
  expect(isNotBoolean(value)).toBe(typeof value !== "boolean");
});

test("narrows both branches", () => {
  function narrow(candidate: string | boolean) {
    if (isNotBoolean(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<boolean>();
    }
  }

  function narrowUnknown(candidate: unknown) {
    if (isNotBoolean(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<unknown>();
    }
  }

  narrow(true);
  narrow("a");
  narrowUnknown(null);
});
