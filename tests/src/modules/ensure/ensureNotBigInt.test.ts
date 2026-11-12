import { describe, expectTypeOf, test } from "vitest";

import { ensureNotBigInt } from "@auaust/toolkit";
import { isNotBigInt } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotBigInt", () => {
  testEnsure(
    ensureNotBigInt,
    isNotBigInt,
    "Expected a value that is not a bigint.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotBigInt<"a" | bigint>).returns.toEqualTypeOf<"a">();
  });
});
