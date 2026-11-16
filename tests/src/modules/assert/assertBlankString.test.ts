import { describe, expectTypeOf, test } from "vitest";

import { assertBlankString } from "@auaust/toolkit";
import { isBlankString } from "@auaust/toolkit/guard";
import type { BlankString } from "@auaust/toolkit/types";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertBlankString", () => {
  testAssertion(assertBlankString, isBlankString, "Expected a blank string");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertBlankString(candidate);

      return candidate;
    }).returns.toEqualTypeOf<BlankString>();
  });
});
