import { describe, expectTypeOf, test } from "vitest";

import { assertArray } from "@auaust/toolkit";
import { isArray } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertArray", () => {
  testAssertion(assertArray, isArray, "Expected an array.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertArray(candidate);

      return candidate;
    }).returns.toEqualTypeOf<any[]>();
  });
});
