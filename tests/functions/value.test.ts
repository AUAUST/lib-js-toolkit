import { value } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { assertType, describe, expect, test, vi } from "vitest";

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

  test("preserves 'this' context in the provided function", () => {
    const context = { multiplier: 3 };

    function multiply(this: typeof context, value: number): number {
      return value * this.multiplier;
    }

    expect(value.call(context, multiply, 10)).toBe(30);
  });

  test("supports the `Callable` protocol", () => {
    const object = {
      [callable]: vi.fn(() => 42 as const),
    };

    const result = value(object);

    expect(result).toBe(42);

    expect(object[callable]).toHaveBeenCalled();

    assertType<42>(result);
  });
});
