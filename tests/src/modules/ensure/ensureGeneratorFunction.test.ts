import { describe, expectTypeOf, test } from "vitest";

import { ensureGeneratorFunction, type Fn } from "@auaust/toolkit";
import { isGeneratorFunction } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureGeneratorFunction", () => {
  testEnsure(
    ensureGeneratorFunction,
    isGeneratorFunction,
    "Expected a generator function",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureGeneratorFunction<unknown>).returns.toEqualTypeOf<
      Fn<Generator>
    >();
  });
});
