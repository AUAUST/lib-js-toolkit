import { describe, expectTypeOf, test } from "vitest";

import { ensureString } from "@auaust/toolkit";
import { isString } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureString", () => {
  testEnsure(ensureString, isString, "Expected a string.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureString<unknown>).returns.toEqualTypeOf<string>();
  });

  test("keeps the string members of a union", () => {
    expectTypeOf(ensureString<"a" | 1>).returns.toEqualTypeOf<"a">();
  });
});
