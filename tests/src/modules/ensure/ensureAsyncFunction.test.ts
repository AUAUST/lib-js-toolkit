import { describe, expectTypeOf, test } from "vitest";

import { ensureAsyncFunction, type AsyncFn } from "@auaust/toolkit";
import { isAsyncFunction } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureAsyncFunction", () => {
  testEnsure(
    ensureAsyncFunction,
    isAsyncFunction,
    "Expected an async function",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureAsyncFunction<unknown>).returns.toEqualTypeOf<AsyncFn>();
  });
});
