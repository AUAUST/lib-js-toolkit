import { describe, expectTypeOf, test } from "vitest";

import { ensureNotUndefined } from "@auaust/toolkit";
import { isNotUndefined } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotUndefined", () => {
  testEnsure(
    ensureNotUndefined,
    isNotUndefined,
    "Expected a value that is not undefined.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf(
      ensureNotUndefined<"a" | undefined>,
    ).returns.toEqualTypeOf<"a">();
  });
});
