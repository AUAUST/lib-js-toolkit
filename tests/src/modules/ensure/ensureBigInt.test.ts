import { describe, expectTypeOf, test } from "vitest";

import { ensureBigInt } from "@auaust/toolkit";
import { isBigInt } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureBigInt", () => {
  testEnsure(ensureBigInt, isBigInt, "Expected a bigint.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureBigInt<unknown>).returns.toEqualTypeOf<bigint>();
  });
});
