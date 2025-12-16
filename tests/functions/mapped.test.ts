import { mapped } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("mapped()", () => {
  test("returns the input value when it's not an object", () => {
    // @ts-expect-error
    expect(mapped(null)).toBeNull();
    // @ts-expect-error
    expect(mapped(undefined)).toBeUndefined();
    // @ts-expect-error
    expect(mapped(42)).toBe(42);
    // @ts-expect-error
    expect(mapped("string")).toBe("string");
    // @ts-expect-error
    expect(mapped(true)).toBe(true);
  });

  test("returns a shallow copy of the source object when no map or transform is provided", () => {
    const source = { a: 1, b: 2, c: { nested: true } };
    const result = mapped(source);

    expect(result).toEqual(source);
    expect(result).not.toBe(source);
    expect(result.c).toBe(source.c);
  });

  test("renames keys based on the provided map object", () => {
    const source = { a: 1, b: 2, c: 3 };
    const result = mapped(source, { a: "alpha", b: "beta" });

    expect(result).toEqual({ alpha: 1, beta: 2, c: 3 });

    // @ts-expect-error
    result.a;
    result.alpha;
  });

  test("renames keys based on the provided map function", () => {
    const source = { a: 1, b: 2, c: 3 };
    const result = mapped(source, (key) => key.toUpperCase());

    expect(result).toEqual({ A: 1, B: 2, C: 3 });
  });

  test("transforms values using the provided transform function", () => {
    const source = { a: 1, b: 2, c: 3 };
    const result = mapped(source, undefined, (value) => value * 10);

    expect(result).toEqual({ a: 10, b: 20, c: 30 });
  });

  test("renames keys and transforms values simultaneously", () => {
    const source = { a: 1, b: 2, c: 3 };
    const result = mapped(
      source,
      { a: "alpha", b: "beta" },
      (value) => value + 5
    );

    expect(result).toEqual({ alpha: 6, beta: 7, c: 8 });
  });
});
