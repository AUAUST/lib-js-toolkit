import { describe, expect, expectTypeOf, test } from "vitest";

import { assert, assertIterable } from "@auaust/toolkit";
import { isIterable } from "@auaust/toolkit/guard";

import { testAssertion } from "#tests/fixtures/assertions";

describe("assertIterable", () => {
  testAssertion(assertIterable, isIterable, "Expected an iterable.");

  test("is attached to assert", () => {
    expect(assert.isIterable).toBe(assertIterable);
  });

  test("narrows unknown", () => {
    expectTypeOf((candidate: unknown) => {
      assertIterable(candidate);

      return candidate;
    }).returns.toEqualTypeOf<Iterable<unknown>>();
  });
});
