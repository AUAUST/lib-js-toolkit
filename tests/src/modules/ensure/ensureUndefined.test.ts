import { describe, expectTypeOf, test } from "vitest";

import { ensureUndefined } from "@auaust/toolkit";
import { isUndefined } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureUndefined", () => {
  testEnsure(ensureUndefined, isUndefined, "Expected undefined.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureUndefined<unknown>).returns.toEqualTypeOf<undefined>();
  });
});
