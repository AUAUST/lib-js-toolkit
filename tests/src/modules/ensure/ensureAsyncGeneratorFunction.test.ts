import { describe, expectTypeOf, test } from "vitest";

import { ensureAsyncGeneratorFunction, type Fn } from "@auaust/toolkit";
import { isAsyncGeneratorFunction } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureAsyncGeneratorFunction", () => {
  testEnsure(
    ensureAsyncGeneratorFunction,
    isAsyncGeneratorFunction,
    "Expected an async generator function",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureAsyncGeneratorFunction<unknown>).returns.toEqualTypeOf<
      Fn<AsyncGenerator>
    >();
  });
});
