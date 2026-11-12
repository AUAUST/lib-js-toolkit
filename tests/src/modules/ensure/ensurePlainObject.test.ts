import { describe, expectTypeOf, test } from "vitest";

import { ensurePlainObject } from "@auaust/toolkit";
import { isPlainObject } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensurePlainObject", () => {
  testEnsure(ensurePlainObject, isPlainObject, "Expected a plain object.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensurePlainObject<unknown>).returns.toEqualTypeOf<
      Record<string, unknown>
    >();
  });
});
