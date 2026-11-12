import { describe, expectTypeOf, test } from "vitest";

import { assertInteger } from "@auaust/toolkit";
import { isInteger } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertInteger", () => {
  testAssertion(assertInteger, isInteger, "Expected an integer.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertInteger(candidate);

      return candidate;
    }).returns.toEqualTypeOf<number>();
  });
});
