import { describe, expectTypeOf, test } from "vitest";

import { ensureFinite } from "@auaust/toolkit";
import { isFinite } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureFinite", () => {
  testEnsure(ensureFinite, isFinite, "Expected a finite number.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureFinite<unknown>).returns.toEqualTypeOf<number>();
  });
});
