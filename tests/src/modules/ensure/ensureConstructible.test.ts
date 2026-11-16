import { describe, expectTypeOf, test } from "vitest";

import { ensureConstructible, type Constructor } from "@auaust/toolkit";
import { isConstructible } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureConstructible", () => {
  testEnsure(ensureConstructible, isConstructible, "Expected a constructor");

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensureConstructible<unknown>,
    ).returns.toEqualTypeOf<Constructor>();
  });
});
