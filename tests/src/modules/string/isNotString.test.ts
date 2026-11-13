import { expect, expectTypeOf, test } from "vitest";

import * as guard from "@auaust/toolkit/guard";
import * as string from "@auaust/toolkit/string";

import { createValues, type FixtureValue } from "#tests/fixtures/values";

test("rejects exactly strings and shares its guard export", () => {
  expect(guard.isNotString).toBe(string.isNotString);

  const values = createValues();
  const filtered = values.filter(string.isNotString);

  expect(filtered).toEqual(values.filter((value) => typeof value !== "string"));
  expectTypeOf(filtered).toEqualTypeOf<Exclude<FixtureValue, string>[]>();
});

test("narrows both branches and preserves unknown", () => {
  function narrow(candidate: string | number) {
    if (string.isNotString(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<number>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  }

  function unknown(candidate: unknown) {
    if (string.isNotString(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<unknown>();
    }
  }

  narrow(1);
  narrow("a");
  unknown(null);
});
