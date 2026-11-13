import { describe, expect, expectTypeOf, test } from "vitest";

import { ensure, ensureIterable } from "@auaust/toolkit";
import { isIterable } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureIterable", () => {
  testEnsure(ensureIterable, isIterable, "Expected an iterable.");

  test("is attached to ensure", () => {
    expect(ensure.isIterable).toBe(ensureIterable);
  });

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureIterable<unknown>).returns.toEqualTypeOf<
      Iterable<unknown>
    >();
  });
});
