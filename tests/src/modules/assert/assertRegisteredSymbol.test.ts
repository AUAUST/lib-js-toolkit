import { describe, expectTypeOf, test } from "vitest";

import { assertRegisteredSymbol } from "@auaust/toolkit";
import { isRegisteredSymbol } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertRegisteredSymbol", () => {
  testAssertion(
    assertRegisteredSymbol,
    isRegisteredSymbol,
    "Expected a registered symbol.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertRegisteredSymbol(candidate);

      return candidate;
    }).returns.toEqualTypeOf<symbol>();
  });
});
