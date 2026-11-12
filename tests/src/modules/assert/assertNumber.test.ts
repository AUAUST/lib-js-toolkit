import { describe, expectTypeOf, test } from "vitest";

import { assertNumber } from "@auaust/toolkit";
import { isNumber } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNumber", () => {
  testAssertion(assertNumber, isNumber, "Expected a number.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertNumber(candidate);

      return candidate;
    }).returns.toEqualTypeOf<number>();
  });
});
