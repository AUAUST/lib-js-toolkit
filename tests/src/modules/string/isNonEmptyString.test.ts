import { describe, expect, expectTypeOf, test } from "vitest";

import { isNonEmptyString } from "@auaust/toolkit/string";
import type { FilledString } from "@auaust/toolkit/types";

describe("isNonEmptyString", () => {
  test("matches strings other than the empty string", () => {
    expect(isNonEmptyString("a")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
  });

  test("narrows an unknown candidate", () => {
    expectTypeOf(isNonEmptyString).guards.toEqualTypeOf<FilledString>();
  });
});
