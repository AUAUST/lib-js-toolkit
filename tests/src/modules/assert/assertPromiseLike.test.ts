import { describe, expectTypeOf, test } from "vitest";

import { assertPromiseLike } from "@auaust/toolkit";
import { isPromiseLike } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertPromiseLike", () => {
  testAssertion(
    assertPromiseLike,
    isPromiseLike,
    "Expected a promise-like value.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertPromiseLike(candidate);

      return candidate;
    }).returns.toEqualTypeOf<PromiseLike<unknown>>();
  });
});
