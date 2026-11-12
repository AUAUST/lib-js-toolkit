import { describe, expectTypeOf, test } from "vitest";

import { ensureObject } from "@auaust/toolkit";
import { isObject } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureObject", () => {
  testEnsure(ensureObject, isObject, "Expected an object.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureObject<unknown>).returns.toEqualTypeOf<object>();
  });
});
