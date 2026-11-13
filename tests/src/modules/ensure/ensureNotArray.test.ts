import { describe, expect, expectTypeOf, test } from "vitest";

import { ensureNotArray } from "@auaust/toolkit";
import { ensure } from "@auaust/toolkit/ensure";
import { isNotArray } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotArray", () => {
  testEnsure(
    ensureNotArray,
    isNotArray,
    "Expected a value that is not an array.",
  );

  test("attaches the helper", () => {
    expect(ensure.isNotArray).toBe(ensureNotArray);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf(
      ensureNotArray<1 | readonly string[]>,
    ).returns.toEqualTypeOf<1>();
  });
});
