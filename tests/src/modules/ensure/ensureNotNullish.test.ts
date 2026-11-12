import { describe, expectTypeOf, test } from "vitest";

import { ensureNotNullish } from "@auaust/toolkit";
import { isNotNullish } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotNullish", () => {
  testEnsure(
    ensureNotNullish,
    isNotNullish,
    "Expected a value that is not null or undefined.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf(
      ensureNotNullish<"a" | null | undefined>,
    ).returns.toEqualTypeOf<"a">();
  });
});
