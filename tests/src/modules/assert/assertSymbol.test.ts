import { describe, expectTypeOf, test } from "vitest";

import { assertSymbol } from "@auaust/toolkit";
import { isSymbol } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertSymbol", () => {
  testAssertion(assertSymbol, isSymbol, "Expected a symbol.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertSymbol(candidate);

      return candidate;
    }).returns.toEqualTypeOf<symbol>();
  });
});
