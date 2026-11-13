import { describe, expect, expectTypeOf, test } from "vitest";

import { ensure, ensureNotNumber } from "@auaust/toolkit";
import { isNotNumber } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotNumber", () => {
  testEnsure(
    ensureNotNumber,
    isNotNumber,
    "Expected a value that is not a number.",
  );

  test("attaches to the callable", () => {
    expect(ensure.isNotNumber).toBe(ensureNotNumber);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotNumber<"a" | number>).returns.toEqualTypeOf<"a">();
  });
});
