import { describe, expectTypeOf, test } from "vitest";

import { assertUndefined } from "@auaust/toolkit";
import { isUndefined } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertUndefined", () => {
  testAssertion(assertUndefined, isUndefined, "Expected undefined.");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertUndefined(candidate);

      return candidate;
    }).returns.toEqualTypeOf<undefined>();
  });
});
