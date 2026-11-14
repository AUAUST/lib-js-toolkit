import { describe, expect, expectTypeOf, test } from "vitest";

import { escapeRegExp } from "@auaust/toolkit/string";

describe("escapeRegExp", () => {
  test("escapes a leading letter and syntax characters", () => {
    expect(escapeRegExp("a.b*c")).toBe("\\x61\\.b\\*c");
  });

  test("escapes digits, punctuators, whitespace and lone surrogates", () => {
    expect(escapeRegExp("1 = \uD800")).toBe("\\x31\\x20\\x3d\\u2028\\ud800");
  });

  test("passes nullish through as undefined", () => {
    const result = escapeRegExp(null);

    expect(result).toBeUndefined();
    expectTypeOf(escapeRegExp("a")).toEqualTypeOf<string>();
  });

  test("matches its input literally", () => {
    const input = "a^$\\.*+?()[]{}|/\t\n\v\f\r,-=<>#&!%:;@~'`\"  \uD800é😀";

    expect(new RegExp(escapeRegExp(input), "u").test(input)).toBe(true);
    expect(new RegExp(escapeRegExp(input)).test(input)).toBe(true);
  });
});
