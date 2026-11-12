import { describe, expectTypeOf, test } from "vitest";

import { ensureNaN } from "@auaust/toolkit";
import { isNaN } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNaN", () => {
  testEnsure(ensureNaN, isNaN, "Expected NaN.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureNaN<unknown>).returns.toEqualTypeOf<number>();
  });
});
