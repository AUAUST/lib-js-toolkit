import { transform } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("transform()", () => {
  test("returns non-object input values unchanged", () => {
    // @ts-expect-error
    expect(transform(null)).toBeNull();
    // @ts-expect-error
    expect(transform(42)).toBe(42);
  });

  test("transforms the original object in place", () => {
    const source = { a: 1, b: 2, c: 3 };
    const result = transform(
      source,
      { a: "alpha", b: "beta" },
      (value) => value + 5,
    );

    expect(result).toBe(source);
    expect(source).toEqual({ alpha: 6, beta: 7, c: 8 });
  });

  test("supports a key mapping function", () => {
    const source = { a: 1, b: 2 };

    expect(transform(source, (key) => key.toUpperCase())).toEqual({
      A: 1,
      B: 2,
    });

    expect(source).toEqual({ A: 1, B: 2 });
  });

  test("deletes keys marked false in an explicit map", () => {
    const source = { foo: 1, bar: 2 };
    const result = transform(source, { foo: false });

    expect(result).toBe(source);
    expect(source).toEqual({ bar: 2 });
    // @ts-expect-error
    result.foo;
    result.bar;
  });

  test("deletes false or undefined mapper results and keeps true results", () => {
    const source = { foo: 1, bar: 2, baz: 3, qux: 4 };

    transform(source, (key) => {
      if (key === "foo") return undefined;
      if (key === "bar") return false;
      if (key === "baz") return true;
      return "renamed";
    });

    expect(source).toEqual({ baz: 3, renamed: 4 });
  });
});
