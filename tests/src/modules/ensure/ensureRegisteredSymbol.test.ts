import { describe, expectTypeOf, test } from "vitest";

import { ensureRegisteredSymbol } from "@auaust/toolkit";
import { isRegisteredSymbol } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureRegisteredSymbol", () => {
  testEnsure(
    ensureRegisteredSymbol,
    isRegisteredSymbol,
    "Expected a registered symbol.",
  );

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensureRegisteredSymbol<unknown>,
    ).returns.toEqualTypeOf<symbol>();
  });
});
