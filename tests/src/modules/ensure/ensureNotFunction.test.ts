import { describe, expectTypeOf, test } from "vitest";

import { ensureNotFunction } from "@auaust/toolkit";
import { isNotFunction } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotFunction", () => {
  testEnsure(
    ensureNotFunction,
    isNotFunction,
    "Expected a value that is not a function.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf(
      ensureNotFunction<"a" | (() => void)>,
    ).returns.toEqualTypeOf<"a">();
  });
});
