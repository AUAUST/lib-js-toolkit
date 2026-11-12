import { describe, expectTypeOf, test } from "vitest";

import { ensureArray } from "@auaust/toolkit";
import { isArray } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureArray", () => {
  testEnsure(ensureArray, isArray, "Expected an array.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureArray<unknown>).returns.toEqualTypeOf<any[]>();
  });
});
