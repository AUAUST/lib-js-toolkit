import { describe, expect, expectTypeOf, test } from "vitest";

import { assert, assertNotNumber } from "@auaust/toolkit";
import { isNotNumber } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotNumber", () => {
  testAssertion(
    assertNotNumber,
    isNotNumber,
    "Expected a value that is not a number.",
  );

  test("attaches to the callable", () => {
    expect(assert.isNotNumber).toBe(assertNotNumber);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | number) => {
      assertNotNumber(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
