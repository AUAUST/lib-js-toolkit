import { describe, expectTypeOf, test } from "vitest";

import { assertAsyncGeneratorFunction, type Fn } from "@auaust/toolkit";
import { isAsyncGeneratorFunction } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertAsyncGeneratorFunction", () => {
  testAssertion(
    assertAsyncGeneratorFunction,
    isAsyncGeneratorFunction,
    "Expected an async generator function.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertAsyncGeneratorFunction(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Fn<AsyncGenerator>>();
  });
});
