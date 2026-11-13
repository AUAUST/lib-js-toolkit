import { describe, expect, expectTypeOf, test } from "vitest";

import { assertNotArray } from "@auaust/toolkit";
import { assert } from "@auaust/toolkit/assert";
import { isNotArray } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotArray", () => {
  testAssertion(
    assertNotArray,
    isNotArray,
    "Expected a value that is not an array.",
  );

  test("attaches the helper", () => {
    expect(assert.isNotArray).toBe(assertNotArray);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: 1 | readonly string[]) => {
      assertNotArray(candidate);

      return candidate;
    }).returns.toEqualTypeOf<1>();
  });
});
