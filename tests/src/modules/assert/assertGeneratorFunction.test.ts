import { describe, expectTypeOf, test } from "vitest";

import { assertGeneratorFunction, type Fn } from "@auaust/toolkit";
import { isGeneratorFunction } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertGeneratorFunction", () => {
  testAssertion(
    assertGeneratorFunction,
    isGeneratorFunction,
    "Expected a generator function",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertGeneratorFunction(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Fn<Generator>>();
  });
});
