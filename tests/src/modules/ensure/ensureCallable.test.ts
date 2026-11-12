import { describe, expectTypeOf, test } from "vitest";

import { ensureCallable, type Callee } from "@auaust/toolkit";
import { isCallable } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureCallable", () => {
  testEnsure(ensureCallable, isCallable, "Expected a callable.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureCallable<unknown>).returns.toEqualTypeOf<Callee>();
  });
});
