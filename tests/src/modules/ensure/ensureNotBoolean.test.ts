import { describe, expect, expectTypeOf, test } from "vitest";

import { ensure, ensureNotBoolean } from "@auaust/toolkit";
import { isNotBoolean } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotBoolean", () => {
  testEnsure(
    ensureNotBoolean,
    isNotBoolean,
    "Expected a value that is not a boolean.",
  );

  test("attaches to the callable", () => {
    expect(ensure.isNotBoolean).toBe(ensureNotBoolean);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotBoolean<"a" | boolean>).returns.toEqualTypeOf<"a">();
  });
});
