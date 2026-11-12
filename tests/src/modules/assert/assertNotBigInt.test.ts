import { describe, expectTypeOf, test } from "vitest";

import { assertNotBigInt } from "@auaust/toolkit";
import { isNotBigInt } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotBigInt", () => {
  testAssertion(
    assertNotBigInt,
    isNotBigInt,
    "Expected a value that is not a bigint.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | bigint) => {
      assertNotBigInt(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
