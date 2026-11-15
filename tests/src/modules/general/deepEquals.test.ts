import { describe, expect, test } from "vitest";

import { deepEquals } from "@auaust/toolkit";

describe("deepEquals", () => {
  test("recurses into arrays and plain objects with SameValueZero leaves", () => {
    expect(deepEquals({ a: [Number.NaN] }, { a: [Number.NaN] })).toBe(true);
    expect(deepEquals({ a: [1, 2] }, { a: [1] })).toBe(false);
    expect(deepEquals({ a: 1 }, { b: 1 })).toBe(false);
  });

  test("compares class instances by reference", () => {
    expect(deepEquals(new Date(0), new Date(0))).toBe(false);
  });

  test("ends on self-referencing objects of the same shape", () => {
    const a: Record<string, unknown> = { value: 1 };
    const b: Record<string, unknown> = { value: 1 };

    a.self = a;
    b.self = b;

    expect(deepEquals(a, b)).toBe(true);
  });
});
