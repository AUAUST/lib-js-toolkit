import { describe, expectTypeOf, test } from "vitest";

import { assertNaN } from "@auaust/toolkit";
import { isNaN } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNaN", () => {
  testAssertion(assertNaN, isNaN, "Expected NaN.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertNaN(candidate);

      return candidate;
    }).returns.toEqualTypeOf<number>();
  });
});
