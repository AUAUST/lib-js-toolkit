import { describe, expectTypeOf, test } from "vitest";

import { assertNonEmptyArray } from "@auaust/toolkit";
import { isNonEmptyArray } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNonEmptyArray", () => {
  testAssertion(
    assertNonEmptyArray,
    isNonEmptyArray,
    "Expected a non-empty array.",
  );

  test("narrows a readonly array", () => {
    expectTypeOf((candidate: readonly string[]) => {
      assertNonEmptyArray(candidate);

      return candidate;
    }).returns.toEqualTypeOf<readonly [string, ...string[]]>();
  });
});
