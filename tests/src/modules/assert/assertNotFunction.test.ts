import { describe, expectTypeOf, test } from "vitest";

import { assertNotFunction } from "@auaust/toolkit";
import { isNotFunction } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotFunction", () => {
  testAssertion(
    assertNotFunction,
    isNotFunction,
    "Expected a value that is not a function.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | (() => void)) => {
      assertNotFunction(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
