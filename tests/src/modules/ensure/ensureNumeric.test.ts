import { describe, expectTypeOf, test } from "vitest";

import { ensureNumeric } from "@auaust/toolkit";
import { isNumeric } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNumeric", () => {
  testEnsure(ensureNumeric, isNumeric, "Expected a number or bigint.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureNumeric<unknown>).returns.toEqualTypeOf<
      number | bigint
    >();
  });
});
