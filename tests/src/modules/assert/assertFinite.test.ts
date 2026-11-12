import { describe, expectTypeOf, test } from "vitest";

import { assertFinite } from "@auaust/toolkit";
import { isFinite } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertFinite", () => {
  testAssertion(assertFinite, isFinite, "Expected a finite number.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertFinite(candidate);

      return candidate;
    }).returns.toEqualTypeOf<number>();
  });
});
