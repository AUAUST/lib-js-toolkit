import { describe, expect, expectTypeOf, test } from "vitest";

import { assertString } from "@auaust/toolkit";
import { isString } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertString", () => {
  testAssertion(assertString, isString, "Expected a string");

  test("appends the received value to the default message only", () => {
    expect(() => assertString(42)).toThrow("Expected a string, received 42.");
    expect(() => assertString(42, "Custom")).toThrow(/^Custom$/);
  });

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
