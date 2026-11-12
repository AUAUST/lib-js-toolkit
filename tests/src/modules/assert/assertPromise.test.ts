import { describe, expectTypeOf, test } from "vitest";

import { assertPromise } from "@auaust/toolkit";
import { isPromise } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertPromise", () => {
  testAssertion(assertPromise, isPromise, "Expected a promise.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertPromise(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Promise<unknown>>();
  });
});
