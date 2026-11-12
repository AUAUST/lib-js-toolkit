import { describe, expectTypeOf, test } from "vitest";

import { ensureInteger } from "@auaust/toolkit";
import { isInteger } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureInteger", () => {
  testEnsure(ensureInteger, isInteger, "Expected an integer.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureInteger<unknown>).returns.toEqualTypeOf<number>();
  });
});
