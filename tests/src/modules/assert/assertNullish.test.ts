import { describe, expectTypeOf, test } from "vitest";

import { assertNullish } from "@auaust/toolkit";
import { isNullish } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNullish", () => {
  testAssertion(assertNullish, isNullish, "Expected null or undefined.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertNullish(candidate);

      return candidate;
    }).returns.toEqualTypeOf<null | undefined>();
  });
});
