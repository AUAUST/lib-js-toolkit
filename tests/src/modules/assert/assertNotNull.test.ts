import { describe, expectTypeOf, test } from "vitest";

import { assertNotNull } from "@auaust/toolkit";
import { isNotNull } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotNull", () => {
  testAssertion(assertNotNull, isNotNull, "Expected a value that is not null.");

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | null) => {
      assertNotNull(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
