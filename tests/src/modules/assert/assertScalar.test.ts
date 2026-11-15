import { describe, expectTypeOf, test } from "vitest";

import { assertScalar } from "@auaust/toolkit";
import { isScalar } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertScalar", () => {
  testAssertion(assertScalar, isScalar, "Expected a scalar.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertScalar(candidate);

      return candidate;
    }).returns.toEqualTypeOf<string | number | boolean | bigint>();
  });
});
