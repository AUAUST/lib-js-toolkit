import { describe, expect, expectTypeOf, test } from "vitest";

import { toLocaleLowerCase } from "@auaust/toolkit/string";

describe("toLocaleLowerCase", () => {
  test("follows the given locale", () => {
    expect(toLocaleLowerCase("I", { locale: "tr" })).toBe("ı");
  });

  test("is locale-independent without a locale", () => {
    expect(toLocaleLowerCase("I")).toBe("i");
  });

  test("passes nullish input through", () => {
    expect(toLocaleLowerCase(null)).toBeNull();
    expectTypeOf(toLocaleLowerCase(undefined)).toEqualTypeOf<undefined>();
  });
});
