import { describe, expect, expectTypeOf, test } from "vitest";

import { uncapitalize } from "@auaust/toolkit/string";

describe("uncapitalize", () => {
  test("lowercases the first code point", () => {
    expect(uncapitalize("ÉBC")).toBe("éBC");
  });

  test("keeps a leading astral character whole", () => {
    expect(uncapitalize("𝐀B")).toBe("𝐀B");
  });

  test("keeps literal types", () => {
    expectTypeOf(uncapitalize("FOO")).toEqualTypeOf<"fOO">();
    expectTypeOf(uncapitalize("A" as string)).toEqualTypeOf<string>();
  });

  test("passes nullish input through", () => {
    expect(uncapitalize(undefined)).toBeUndefined();
  });
});
