import { describe, expectTypeOf, test } from "vitest";

import { assertPropertyKey } from "@auaust/toolkit";
import { isPropertyKey } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertPropertyKey", () => {
  testAssertion(assertPropertyKey, isPropertyKey, "Expected a property key.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertPropertyKey(candidate);

      return candidate;
    }).returns.toEqualTypeOf<PropertyKey>();
  });
});
