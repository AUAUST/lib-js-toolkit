import { describe, expectTypeOf, test } from "vitest";

import { ensureSymbol } from "@auaust/toolkit";
import { isSymbol } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureSymbol", () => {
  testEnsure(ensureSymbol, isSymbol, "Expected a symbol.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureSymbol<unknown>).returns.toEqualTypeOf<symbol>();
  });
});
