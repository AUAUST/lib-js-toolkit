import { describe, expectTypeOf, test } from "vitest";

import { ensureEmptyArray } from "@auaust/toolkit";
import { isEmptyArray } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureEmptyArray", () => {
  testEnsure(ensureEmptyArray, isEmptyArray, "Expected an empty array.");

  test("types a mutable array as a mutable tuple", () => {
    expectTypeOf(ensureEmptyArray([])).toEqualTypeOf<[]>();
  });
});
