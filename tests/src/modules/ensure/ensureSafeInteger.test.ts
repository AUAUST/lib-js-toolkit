import { describe, expectTypeOf, test } from "vitest";

import { ensureSafeInteger } from "@auaust/toolkit";
import { isSafeInteger } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureSafeInteger", () => {
  testEnsure(ensureSafeInteger, isSafeInteger, "Expected a safe integer.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureSafeInteger<unknown>).returns.toEqualTypeOf<number>();
  });
});
