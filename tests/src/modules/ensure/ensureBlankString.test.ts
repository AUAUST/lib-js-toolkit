import { describe, expectTypeOf, test } from "vitest";

import { ensureBlankString } from "@auaust/toolkit";
import { isBlankString } from "@auaust/toolkit/guard";
import type { BlankString } from "@auaust/toolkit/types";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureBlankString", () => {
  testEnsure(ensureBlankString, isBlankString, "Expected a blank string.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensureBlankString<unknown>,
    ).returns.toEqualTypeOf<BlankString>();
  });
});
