import { describe, expect, expectTypeOf, test } from "vitest";

import { isEmptyString } from "@auaust/toolkit/string";
import type { EmptyString } from "@auaust/toolkit/types";

describe("isEmptyString", () => {
  test("matches only the empty string", () => {
    expect(isEmptyString("")).toBe(true);
    expect(isEmptyString(" ")).toBe(false);
    expect(isEmptyString(0)).toBe(false);
  });

  test("narrows an unknown candidate", () => {
    expectTypeOf(isEmptyString).guards.toEqualTypeOf<EmptyString>();
  });
});
