import { describe, expectTypeOf, test } from "vitest";

import { assertString } from "@auaust/toolkit";
import { isString } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertString", () => {
  testAssertion(assertString, isString, "Expected a string.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertString(candidate);

      return candidate;
    }).returns.toEqualTypeOf<string>();
  });

  test("narrows a union to its string members", () => {
    expectTypeOf((candidate: "a" | 1) => {
      assertString(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
