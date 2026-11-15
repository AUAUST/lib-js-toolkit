import { describe, expect, expectTypeOf, test } from "vitest";

import { empty } from "@auaust/toolkit";
import { isBlankString } from "@auaust/toolkit/string";
import type { BlankString } from "@auaust/toolkit/types";

describe("isBlankString", () => {
  test("matches strings whose trim is empty", () => {
    expect(isBlankString(" \n")).toBe(true);
    expect(isBlankString("")).toBe(true);
    expect(isBlankString(" a ")).toBe(false);
    expect(isBlankString(0)).toBe(false);
  });

  test("keeps empty treating blank strings as empty", () => {
    expect(empty(" ")).toBe(true);
  });

  test("narrows an unknown candidate", () => {
    expectTypeOf(isBlankString).guards.toEqualTypeOf<BlankString>();
  });
});
