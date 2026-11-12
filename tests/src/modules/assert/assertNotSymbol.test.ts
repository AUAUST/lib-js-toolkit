import { describe, expectTypeOf, test } from "vitest";

import { assertNotSymbol } from "@auaust/toolkit";
import { isNotSymbol } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotSymbol", () => {
  testAssertion(
    assertNotSymbol,
    isNotSymbol,
    "Expected a value that is not a symbol.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | symbol) => {
      assertNotSymbol(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
