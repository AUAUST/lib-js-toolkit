import { describe, expectTypeOf, test } from "vitest";

import { ensureNotSymbol } from "@auaust/toolkit";
import { isNotSymbol } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotSymbol", () => {
  testEnsure(
    ensureNotSymbol,
    isNotSymbol,
    "Expected a value that is not a symbol.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotSymbol<"a" | symbol>).returns.toEqualTypeOf<"a">();
  });
});
