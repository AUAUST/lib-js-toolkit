import { describe, expectTypeOf, test } from "vitest";

import { assertNumeric } from "@auaust/toolkit";
import { isNumeric } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNumeric", () => {
  testAssertion(assertNumeric, isNumeric, "Expected a number or bigint.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertNumeric(candidate);

      return candidate;
    }).returns.toEqualTypeOf<number | bigint>();
  });
});
