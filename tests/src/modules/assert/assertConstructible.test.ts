import { describe, expectTypeOf, test } from "vitest";

import { assertConstructible, type Constructor } from "@auaust/toolkit";
import { isConstructible } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertConstructible", () => {
  testAssertion(assertConstructible, isConstructible, "Expected a constructor");

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertConstructible(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Constructor>();
  });
});
