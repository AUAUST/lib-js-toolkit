import { describe, expectTypeOf, test } from "vitest";

import { ensurePropertyComposer } from "@auaust/toolkit";
import { isPropertyComposer } from "@auaust/toolkit/guard";
import type { PropertyComposer } from "@auaust/toolkit/composer";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensurePropertyComposer", () => {
  testEnsure(
    ensurePropertyComposer,
    isPropertyComposer,
    "Expected a property composer.",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensurePropertyComposer<unknown>,
    ).returns.toEqualTypeOf<PropertyComposer>();
  });
});
