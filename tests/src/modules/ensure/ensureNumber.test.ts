import { describe, expectTypeOf, test } from "vitest";

import { ensureNumber } from "@auaust/toolkit";
import { isNumber } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNumber", () => {
  testEnsure(ensureNumber, isNumber, "Expected a number.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureNumber<unknown>).returns.toEqualTypeOf<number>();
  });
});
