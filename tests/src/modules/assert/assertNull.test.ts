import { describe, expectTypeOf, test } from "vitest";

import { assertNull } from "@auaust/toolkit";
import { isNull } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertNull", () => {
  testAssertion(assertNull, isNull, "Expected null.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertNull(candidate);

      return candidate;
    }).returns.toEqualTypeOf<null>();
  });
});
