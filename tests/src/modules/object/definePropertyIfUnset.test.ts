import { describe, expect, expectTypeOf, test } from "vitest";

import { create, definePropertyIfUnset, hasOwn } from "@auaust/toolkit/object";

describe("definePropertyIfUnset", () => {
  test("defines a missing key", () => {
    const target = {};

    const result = definePropertyIfUnset(target, "added", {
      value: "entry",
      writable: true,
    });

    expect(result).toBe(target);
    expectTypeOf(result.added).toEqualTypeOf<"entry">();
    expect(result.added).toBe("entry");
  });

  test("defines a key present only on the prototype", () => {
    const target = create({
      inherited: 1,
    });

    definePropertyIfUnset(target, "inherited", {
      value: 2,
    });

    expect(hasOwn(target, "inherited")).toBe(true);
    expect(target.inherited).toBe(2);
  });

  test("keeps an own key untouched", () => {
    const target = {
      name: "kept",
    };

    const result = definePropertyIfUnset(target, "name", {
      value: "lost",
    });

    expectTypeOf(result).toEqualTypeOf<{ name: string }>();
    expect(result.name).toBe("kept");
  });
});
