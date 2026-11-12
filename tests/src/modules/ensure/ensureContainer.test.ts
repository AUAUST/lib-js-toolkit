import { describe, expectTypeOf, test } from "vitest";

import { ensureContainer } from "@auaust/toolkit";
import { isContainer } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureContainer", () => {
  testEnsure(ensureContainer, isContainer, "Expected an object or a function.");

  test("types unknown as the guarded type", () => {
    expectTypeOf(ensureContainer<unknown>).returns.toEqualTypeOf<object>();
  });
});
