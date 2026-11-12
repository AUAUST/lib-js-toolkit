import { describe, expectTypeOf, test } from "vitest";

import { assertContainer } from "@auaust/toolkit";
import { isContainer } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertContainer", () => {
  testAssertion(
    assertContainer,
    isContainer,
    "Expected an object or a function.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertContainer(candidate);

      return candidate;
    }).returns.toEqualTypeOf<object>();
  });
});
