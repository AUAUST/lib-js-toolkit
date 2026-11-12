import { describe, expectTypeOf, test } from "vitest";

import { ensureNull } from "@auaust/toolkit";
import { isNull } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNull", () => {
  testEnsure(ensureNull, isNull, "Expected null.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureNull<unknown>).returns.toEqualTypeOf<null>();
  });
});
