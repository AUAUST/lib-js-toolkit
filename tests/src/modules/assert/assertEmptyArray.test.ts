import { describe, expectTypeOf, test } from "vitest";

import { assertEmptyArray } from "@auaust/toolkit";
import { isEmptyArray } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertEmptyArray", () => {
  testAssertion(assertEmptyArray, isEmptyArray, "Expected an empty array");

  test("narrows a readonly array", () => {
    expectTypeOf((candidate: readonly string[]) => {
      assertEmptyArray(candidate);

      return candidate;
    }).returns.toEqualTypeOf<readonly []>();
  });
});
