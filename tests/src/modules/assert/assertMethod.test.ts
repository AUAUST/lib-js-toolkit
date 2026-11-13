import { describe, expectTypeOf, test } from "vitest";

import { assertMethod } from "@auaust/toolkit";
import { isMethod } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertMethod", () => {
  testAssertion(
    (candidate: unknown, message?: string) => {
      assertMethod(candidate, Symbol.iterator, message);
    },
    (candidate: unknown) => isMethod(candidate, Symbol.iterator),
    "Expected a method.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertMethod(candidate, "then");

      return candidate;
    }).returns.toEqualTypeOf<{
      then(...args: unknown[]): unknown;
    }>();
  });
});
