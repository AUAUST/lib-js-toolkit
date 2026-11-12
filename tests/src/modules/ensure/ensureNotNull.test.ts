import { describe, expectTypeOf, test } from "vitest";

import { ensureNotNull } from "@auaust/toolkit";
import { isNotNull } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotNull", () => {
  testEnsure(ensureNotNull, isNotNull, "Expected a value that is not null.");

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotNull<"a" | null>).returns.toEqualTypeOf<"a">();
  });
});
