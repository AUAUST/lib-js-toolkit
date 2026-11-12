import { describe, expectTypeOf, test } from "vitest";

import { ensurePromise } from "@auaust/toolkit";
import { isPromise } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensurePromise", () => {
  testEnsure(ensurePromise, isPromise, "Expected a promise.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensurePromise<unknown>).returns.toEqualTypeOf<
      Promise<unknown>
    >();
  });
});
