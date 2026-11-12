import { describe, expectTypeOf, test } from "vitest";

import { assertBoolean } from "@auaust/toolkit";
import { isBoolean } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertBoolean", () => {
  testAssertion(assertBoolean, isBoolean, "Expected a boolean.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertBoolean(candidate);

      return candidate;
    }).returns.toEqualTypeOf<boolean>();
  });
});
