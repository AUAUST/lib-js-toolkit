import { describe, expectTypeOf, test } from "vitest";

import { assertBigInt } from "@auaust/toolkit";
import { isBigInt } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertBigInt", () => {
  testAssertion(assertBigInt, isBigInt, "Expected a bigint.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertBigInt(candidate);

      return candidate;
    }).returns.toEqualTypeOf<bigint>();
  });
});
