import { describe, expect, expectTypeOf, test } from "vitest";

import { ensureNotString } from "@auaust/toolkit";
import { ensure } from "@auaust/toolkit/ensure";
import { isNotString } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureNotString", () => {
  testEnsure(
    ensureNotString,
    isNotString,
    "Expected a value that is not a string.",
  );

  test("attaches the helper", () => {
    expect(ensure.isNotString).toBe(ensureNotString);
  });

  test("removes the excluded members of a union", () => {
    expectTypeOf(ensureNotString<1 | string>).returns.toEqualTypeOf<1>();
  });
});
