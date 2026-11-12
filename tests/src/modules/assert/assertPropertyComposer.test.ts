import { describe, expectTypeOf, test } from "vitest";

import { assertPropertyComposer } from "@auaust/toolkit";
import { isPropertyComposer } from "@auaust/toolkit/guard";
import type { PropertyComposer } from "@auaust/toolkit/composer";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertPropertyComposer", () => {
  testAssertion(
    assertPropertyComposer,
    isPropertyComposer,
    "Expected a property composer.",
  );

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertPropertyComposer(candidate);

      return candidate;
    }).returns.toEqualTypeOf<PropertyComposer>();
  });
});
