import { describe, expectTypeOf, test } from "vitest";

import { ensureBoolean } from "@auaust/toolkit";
import { isBoolean } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureBoolean", () => {
  testEnsure(ensureBoolean, isBoolean, "Expected a boolean.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureBoolean<unknown>).returns.toEqualTypeOf<boolean>();
  });
});
