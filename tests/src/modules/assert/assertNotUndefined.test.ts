import { describe, expectTypeOf, test } from "vitest";

import { assertNotUndefined } from "@auaust/toolkit";
import { isNotUndefined } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotUndefined", () => {
  testAssertion(
    assertNotUndefined,
    isNotUndefined,
    "Expected a value that is not undefined.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | undefined) => {
      assertNotUndefined(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
