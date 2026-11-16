import { describe, expectTypeOf, test } from "vitest";

import { assertEmptyString } from "@auaust/toolkit";
import { isEmptyString } from "@auaust/toolkit/guard";
import type { EmptyString } from "@auaust/toolkit/types";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertEmptyString", () => {
  testAssertion(assertEmptyString, isEmptyString, "Expected an empty string");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertEmptyString(candidate);

      return candidate;
    }).returns.toEqualTypeOf<EmptyString>();
  });
});
