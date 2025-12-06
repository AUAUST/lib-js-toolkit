import { value } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("value()", () => {
  test("returns the provided value when it's not a function", () => {
    expect(value(42)).toBe(42);
    expect(value("Hello")).toBe("Hello");

    const obj = { a: 1 };
    expect(value(obj)).toBe(obj);

    const sym = Symbol("test");
    expect(value(sym)).toBe(sym);
  });

  test("calls and returns the result of the provided function", () => {
    expect(value(() => 42)).toBe(42);
    expect(value(() => "Hello")).toBe("Hello");

    const obj = { a: 1 };
    expect(value(() => obj)).toBe(obj);

    const sym = Symbol("test");
    expect(value(() => sym)).toBe(sym);
  });

  test("passes arguments to the provided function", () => {
    const sum = vi.fn((a: number, b: number) => a + b);

    expect(value(sum, 2, 3)).toBe(5);

    expect(sum).toHaveBeenCalledWith(2, 3);

    expect(value(sum, 10, 15)).toBe(25);
  });
});
