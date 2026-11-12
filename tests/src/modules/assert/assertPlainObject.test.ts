import { describe, expectTypeOf, test } from "vitest";

import { assertPlainObject } from "@auaust/toolkit";
import { isPlainObject } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertPlainObject", () => {
  testAssertion(assertPlainObject, isPlainObject, "Expected a plain object.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertPlainObject(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Record<string, unknown>>();
  });
});
