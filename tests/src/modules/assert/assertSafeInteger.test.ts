import { describe, expectTypeOf, test } from "vitest";

import { assertSafeInteger } from "@auaust/toolkit";
import { isSafeInteger } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertSafeInteger", () => {
  testAssertion(assertSafeInteger, isSafeInteger, "Expected a safe integer.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertSafeInteger(candidate);

      return candidate;
    }).returns.toEqualTypeOf<number>();
  });
});
