import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { getOrSet } from "@auaust/toolkit/maplike";

describe("getOrSet", () => {
  test("calls the factory once over two calls", () => {
    const map = new Map<string, string>();
    const fallback = vi.fn((key: string) => key + 1);
    const result = getOrSet(map, "a", fallback);

    expect(result).toBe("a1");
    expect(getOrSet(map, "a", fallback)).toBe("a1");
    expect(fallback).toHaveBeenCalledExactlyOnceWith("a");
    expect(map.get("a")).toBe("a1");
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  test("returns a stored undefined instead of replacing it", () => {
    const map = new Map<string, number | undefined>([["a", undefined]]);

    expect(getOrSet(map, "a", 1)).toBeUndefined();
    expect(map.get("a")).toBeUndefined();
  });
});
