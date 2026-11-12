import { describe, expectTypeOf, test } from "vitest";

import { assertNotObject } from "@auaust/toolkit";
import { isNotObject } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNotObject", () => {
  testAssertion(
    assertNotObject,
    isNotObject,
    "Expected a value that is not an object.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf((candidate: "a" | object) => {
      assertNotObject(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"a">();
  });
});
