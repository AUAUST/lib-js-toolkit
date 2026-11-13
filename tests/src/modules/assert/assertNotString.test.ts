import { describe, expect, expectTypeOf, test } from "vitest";

import { assertNotString } from "@auaust/toolkit";
import { assert } from "@auaust/toolkit/assert";
import { isNotString } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotString", () => {
  testAssertion(
    assertNotString,
    isNotString,
    "Expected a value that is not a string.",
  );

  test("attaches the helper", () => {
    expect(assert.isNotString).toBe(assertNotString);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: 1 | string) => {
      assertNotString(candidate);

      return candidate;
    }).returns.toEqualTypeOf<1>();
  });
});
