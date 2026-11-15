import { describe, expectTypeOf, test } from "vitest";

import { ensureNonEmptyArray } from "@auaust/toolkit";
import { isNonEmptyArray } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNonEmptyArray", () => {
  testEnsure(
    ensureNonEmptyArray,
    isNonEmptyArray,
    "Expected a non-empty array.",
  );

  test("types a mutable array as a mutable tuple", () => {
    expectTypeOf(ensureNonEmptyArray([1])).toEqualTypeOf<
      [number, ...number[]]
    >();
  });
});
