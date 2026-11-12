import { describe, expectTypeOf, test } from "vitest";

import { assertObject } from "@auaust/toolkit";
import { isObject } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertObject", () => {
  testAssertion(assertObject, isObject, "Expected an object.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertObject(candidate);

      return candidate;
    }).returns.toEqualTypeOf<object>();
  });
});
