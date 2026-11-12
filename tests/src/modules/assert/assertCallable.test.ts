import { describe, expectTypeOf, test } from "vitest";

import { assertCallable, type Callee } from "@auaust/toolkit";
import { isCallable } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertCallable", () => {
  testAssertion(assertCallable, isCallable, "Expected a callable.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertCallable(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Callee>();
  });
});
