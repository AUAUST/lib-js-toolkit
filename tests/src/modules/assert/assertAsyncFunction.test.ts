import { describe, expectTypeOf, test } from "vitest";

import { assertAsyncFunction, type AsyncFn } from "@auaust/toolkit";
import { isAsyncFunction } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertAsyncFunction", () => {
  testAssertion(
    assertAsyncFunction,
    isAsyncFunction,
    "Expected an async function",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertAsyncFunction(candidate);

      return candidate;
    }).returns.toEqualTypeOf<AsyncFn>();
  });
});
