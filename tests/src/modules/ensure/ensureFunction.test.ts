import { describe, expectTypeOf, test } from "vitest";

import { ensureFunction } from "@auaust/toolkit";
import { isFunction } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureFunction", () => {
  testEnsure(ensureFunction, isFunction, "Expected a function.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureFunction<unknown>).returns.toEqualTypeOf<
      (...args: unknown[]) => unknown
    >();
  });
});
