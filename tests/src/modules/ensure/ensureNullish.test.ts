import { describe, expectTypeOf, test } from "vitest";

import { ensureNullish } from "@auaust/toolkit";
import { isNullish } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNullish", () => {
  testEnsure(ensureNullish, isNullish, "Expected null or undefined.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureNullish<unknown>).returns.toEqualTypeOf<
      null | undefined
    >();
  });
});
