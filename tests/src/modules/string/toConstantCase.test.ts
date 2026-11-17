import { describe, expect, expectTypeOf, test } from "vitest";

import { screaming, toConstantCase } from "@auaust/toolkit/string";

describe("toConstantCase", () => {
  test("joins uppercased words with underscores", () => {
    expect(toConstantCase("fooBar baz")).toBe("FOO_BAR_BAZ");
    expectTypeOf(toConstantCase("fooBar baz")).toEqualTypeOf<"FOO_BAR_BAZ">();
    expect(toConstantCase("XMLHttpRequest")).toBe("XML_HTTP_REQUEST");
    expect(screaming).toBe(toConstantCase);
  });

  test("follows the locale", () => {
    expect(toConstantCase("istanbul", { locale: "tr" })).toBe("İSTANBUL");
  });

  test("returns undefined for nullish strings and string for wide ones", () => {
    expect(toConstantCase(null)).toBeUndefined();
    expectTypeOf(toConstantCase("a" as string)).toEqualTypeOf<string>();
  });
});
