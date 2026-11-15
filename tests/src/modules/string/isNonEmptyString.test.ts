import { describe, expect, expectTypeOf, test } from "vitest";

import { isNonEmptyString } from "@auaust/toolkit/string";

describe("isNonEmptyString", () => {
  test("matches strings other than the empty string", () => {
    expect(isNonEmptyString(" ")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
  });

  test("keeps whitespace literals", () => {
    const candidate = " " as " " | "";

    if (isNonEmptyString(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<" ">();
    }
  });

  test("narrows an unknown candidate", () => {
    const candidate: unknown = "a";

    if (isNonEmptyString(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  });
});
