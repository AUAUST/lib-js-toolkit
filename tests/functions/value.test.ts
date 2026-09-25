import { value } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { assertType, describe, expect, expectTypeOf, test, vi } from "vitest";

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

  test("resolves a generic value or callback when called with a context", () => {
    class Context {
      resolve<T>(input: T | ((this: Context) => T)) {
        const called = value.call(this, input);
        const applied = value.apply(this, [input]);

        assertType<T>(called);
        assertType<T>(applied);

        return called;
      }
    }

    const context = new Context();

    expect(context.resolve(42)).toBe(42);

    expect(
      context.resolve(function () {
        return this;
      }),
    ).toBe(context);
  });

  test("resolves unions using their shared callable arguments", () => {
    type Source =
      | (() => number)
      | ((name: string) => string)
      | boolean
      | ((something: unknown) => number);

    const source = ((something: unknown) => Number(something)) as Source;

    const result = value(source, "name");

    expect(result).toBeNaN();

    assertType<boolean | number | string>(result);

    expectTypeOf(value).toBeCallableWith(source, "name");
  });

  test("preserves generic results through native methods", () => {
    const input = <const V extends number, const S extends string>(
      value: V,
      suffix: S,
    ): `${V}${S}` => `${value}${suffix}` as const;

    assertType<`${number}${string}` | 32>(
      value(input as typeof input | 32, 1, "!"),
    );

    assertType<`${number}${string}`>(value(input, 1, "!"));

    assertType<`${number}${string}`>(value.call(null, input, 1, "!"));

    assertType<`${number}${string}`>(value.apply(null, [input, 1, "!"]));
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
