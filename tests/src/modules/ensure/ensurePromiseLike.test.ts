import { describe, expectTypeOf, test } from "vitest";

import { ensurePromiseLike } from "@auaust/toolkit";
import { isPromiseLike } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensurePromiseLike", () => {
  testEnsure(
    ensurePromiseLike,
    isPromiseLike,
    "Expected a promise-like value.",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensurePromiseLike<unknown>).returns.toEqualTypeOf<
      PromiseLike<unknown>
    >();
  });
});
