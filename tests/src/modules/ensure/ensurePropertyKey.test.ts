import { describe, expectTypeOf, test } from "vitest";

import { ensurePropertyKey } from "@auaust/toolkit";
import { isPropertyKey } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensurePropertyKey", () => {
  testEnsure(ensurePropertyKey, isPropertyKey, "Expected a property key.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensurePropertyKey<unknown>,
    ).returns.toEqualTypeOf<PropertyKey>();
  });
});
