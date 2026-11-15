import { describe, expectTypeOf, test } from "vitest";

import { ensureNonEmptyString } from "@auaust/toolkit";
import { isNonEmptyString } from "@auaust/toolkit/guard";
import type { NonEmptyString } from "@auaust/toolkit/types";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNonEmptyString", () => {
  testEnsure(
    ensureNonEmptyString,
    isNonEmptyString,
    "Expected a non-empty string.",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensureNonEmptyString<unknown>,
    ).returns.toEqualTypeOf<NonEmptyString>();
  });
});
