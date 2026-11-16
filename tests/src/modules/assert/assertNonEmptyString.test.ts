import { describe, expectTypeOf, test } from "vitest";

import { assertNonEmptyString } from "@auaust/toolkit";
import { isNonEmptyString } from "@auaust/toolkit/guard";
import type { NonEmptyString } from "@auaust/toolkit/types";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNonEmptyString", () => {
  testAssertion(
    assertNonEmptyString,
    isNonEmptyString,
    "Expected a non-empty string",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertNonEmptyString(candidate);

      return candidate;
    }).returns.toEqualTypeOf<NonEmptyString>();
  });
});
