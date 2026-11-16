import { describe, expectTypeOf, test } from "vitest";

import { ensureScalar } from "@auaust/toolkit";
import { isScalar } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureScalar", () => {
  testEnsure(ensureScalar, isScalar, "Expected a scalar");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureScalar<unknown>).returns.toEqualTypeOf<
      string | number | boolean | bigint
    >();
  });
});
