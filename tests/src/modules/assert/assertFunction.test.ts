import { describe, expectTypeOf, test } from "vitest";

import { assertFunction } from "@auaust/toolkit";
import { isFunction } from "@auaust/toolkit/guard";
import type { UnknownFn } from "@auaust/toolkit/types";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertFunction", () => {
  testAssertion(assertFunction, isFunction, "Expected a function.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertFunction(candidate);

      return candidate;
    }).returns.toEqualTypeOf<UnknownFn>();
  });
});
