import { describe, expectTypeOf, test } from "vitest";

import { ensureEmptyString } from "@auaust/toolkit";
import { isEmptyString } from "@auaust/toolkit/guard";
import type { EmptyString } from "@auaust/toolkit/types";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureEmptyString", () => {
  testEnsure(ensureEmptyString, isEmptyString, "Expected an empty string");

  test("types unknown as the guarded type", () => {
    expectTypeOf(
      ensureEmptyString<unknown>,
    ).returns.toEqualTypeOf<EmptyString>();
  });
});
