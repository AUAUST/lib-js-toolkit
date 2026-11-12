import { describe, expectTypeOf, test } from "vitest";

import { ensureNotObject } from "@auaust/toolkit";
import { isNotObject } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotObject", () => {
  testEnsure(
    ensureNotObject,
    isNotObject,
    "Expected a value that is not an object.",
  );

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotObject<"a" | object>).returns.toEqualTypeOf<"a">();
  });
});
