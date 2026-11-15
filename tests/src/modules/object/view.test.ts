import { describe, expect, expectTypeOf, test } from "vitest";

import { view } from "@auaust/toolkit/object";

describe("view", () => {
  test("calls mapped methods live with the target as this", () => {
    const target = {
      prefix: "a:",
      getItem(key: string): string {
        return this.prefix + key;
      },
    };

    const result = view(target, {
      get: "getItem",
      has(key: string) {
        expectTypeOf(this).toEqualTypeOf<typeof target>();

        return this.getItem(key) !== "";
      },
    });

    expectTypeOf<keyof typeof result>().toEqualTypeOf<"get" | "has">();
    expectTypeOf(result.get).toEqualTypeOf<(key: string) => string>();
    expectTypeOf(result.has).toEqualTypeOf<(key: string) => boolean>();

    expect(result.get("x")).toBe("a:x");
    expect(result.has("x")).toBe(true);

    target.getItem = (key) => `b:${key}`;

    expect(result.get("x")).toBe("b:x");
  });

  test("exposes only mapped members and reads properties live", () => {
    const target = { size: 1, getItem: () => null };
    const result = view(target, { size: true });

    expectTypeOf(result).toEqualTypeOf<{ readonly size: number }>();
    expect("getItem" in result).toBe(false);

    target.size = 2;

    expect(result.size).toBe(2);

    expect(() => {
      // @ts-expect-error The view is read-only.
      result.size = 3;
    }).toThrow(TypeError);
  });
});
