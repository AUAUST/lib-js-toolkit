import { describe, expect, expectTypeOf, test } from "vitest";

import { assert, assertNotBoolean } from "@auaust/toolkit";
import { isNotBoolean } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotBoolean", () => {
  testAssertion(
    assertNotBoolean,
    isNotBoolean,
    "Expected a value that is not a boolean.",
  );

  test("attaches to the callable", () => {
    expect(assert.isNotBoolean).toBe(assertNotBoolean);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | boolean) => {
      assertNotBoolean(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
