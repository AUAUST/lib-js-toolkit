import { describe, expectTypeOf, test } from "vitest";

import { assertNotNullish } from "@auaust/toolkit";
import { isNotNullish } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotNullish", () => {
  testAssertion(
    assertNotNullish,
    isNotNullish,
    "Expected a value that is not null or undefined.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | null | undefined) => {
      assertNotNullish(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
