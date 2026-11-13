import { describe, expectTypeOf, test } from "vitest";

import { assertCallableMember, type Callee } from "@auaust/toolkit";
import { isCallableMember } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertCallableMember", () => {
  testAssertion(
    (candidate: unknown, message?: string) => {
      assertCallableMember(candidate, Symbol.iterator, message);
    },
    (candidate: unknown) => isCallableMember(candidate, Symbol.iterator),
    "Expected a callable member.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertCallableMember(candidate, "then");

      return candidate;
    }).returns.toEqualTypeOf<{
      then: Callee;
    }>();
  });
});
