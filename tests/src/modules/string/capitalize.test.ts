import { describe, expect, expectTypeOf, test } from "vitest";

import { capitalize } from "@auaust/toolkit/string";

describe("capitalize", () => {
  test("uppercases the first code point", () => {
    expect(capitalize("ébc")).toBe("Ébc");
    expect(capitalize("")).toBe("");
  });

  test("keeps a leading astral character whole", () => {
    expect(capitalize("😀a")).toBe("😀a");
  });

  test("keeps literal types", () => {
    expectTypeOf(capitalize("foo")).toEqualTypeOf<"Foo">();
    expectTypeOf(capitalize("a" as string)).toEqualTypeOf<string>();
  });

  test("returns undefined for nullish input", () => {
    expect(capitalize(null)).toBeUndefined();
    expectTypeOf(capitalize(null)).toEqualTypeOf<undefined>();

    expectTypeOf(capitalize("a" as string | null)).toEqualTypeOf<
      string | undefined
    >();
  });
});
