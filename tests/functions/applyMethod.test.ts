import { applyMethod } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("applyMethod()", () => {
  test("calls a named method with its target as receiver", () => {
    const target = {
      value: 2,
      add(amount: number, suffix: string) {
        this.value += amount;
        return `${this.value}${suffix}`;
      },
    };

    const result = applyMethod(target, "add", [3, "!"]);

    expect(result).toBe("5!");

    expect(target.value).toBe(5);

    expectTypeOf(result).toEqualTypeOf<string>();
  });

  test("types the receiver of supplied functions and infers their signatures", () => {
    const target = { value: 2 };

    const fn = function (this: typeof target, amount: number) {
      return this.value + amount;
    };

    const result = applyMethod(target, fn, [3]);

    expect(result).toBe(5);

    expectTypeOf(result).toEqualTypeOf<number>();

    const contextual = applyMethod(
      target,
      function () {
        expectTypeOf(this).toEqualTypeOf<typeof target>();
        return this.value;
      },
      [],
    );

    expect(contextual).toBe(2);

    expectTypeOf(contextual).toEqualTypeOf<number>();

    expect(applyMethod(target, (n: number) => n * 2, [2])).toBe(4);
  });

  test("supports symbol and numeric names, optional arguments, and rest arguments", () => {
    const symbol = Symbol("method");

    const target = {
      value: 2,
      [symbol]() {
        return this.value;
      },
      0(prefix = "value", ...values: number[]) {
        return `${prefix}: ${this.value + values.reduce((a, b) => a + b, 0)}`;
      },
    };

    expect(applyMethod(target, symbol, [])).toBe(2);

    expect(applyMethod(target, 0, [])).toBe("value: 2");

    expect(applyMethod(target, 0, ["sum", 3, 4])).toBe("sum: 9");
  });

  test("resolves inherited methods and getters using the target", () => {
    class Target {
      value = 7;
      method() {
        return this.value;
      }
      get action() {
        expect(this).toBe(target);
        return this.method;
      }
    }

    const target = new Target();

    expect(applyMethod(target, "method", [])).toBe(7);

    expect(applyMethod(target, "action", [])).toBe(7);
  });

  test("uses the explicit target even when the helper is invoked as a method", () => {
    const target = {
      value: 7,
      method() {
        return this;
      },
    };

    const other = { value: 99, invoke: applyMethod };

    expect(other.invoke(target, "method", [])).toBe(target);
  });

  test("propagates exceptions from the invoked method", () => {
    const error = new Error("method failed");

    const target = {
      fail() {
        throw error;
      },
    };

    expect(() => applyMethod(target, "fail")).toThrow(error);
  });

  test("rejects missing and non-function members", () => {
    const target = { value: 2 };
    // @ts-expect-error A data property is not a method.
    expect(() => applyMethod(target, "value", [])).toThrow(TypeError);
    // @ts-expect-error The method does not exist.
    expect(() => applyMethod(target, "missing", [])).toThrow(TypeError);
  });

  test("rejects incorrect arguments and incompatible receiver types", () => {
    const target = {
      value: 2,
      add(amount: number) {
        return this.value + amount;
      },
      incompatible(this: { other: string }) {
        return this.other;
      },
    };

    const fn = function (this: typeof target, amount: number) {
      return this.value + amount;
    };

    const incompatible = function (this: { other: string }) {
      return this.other;
    };

    if (false) {
      // @ts-expect-error Required argument is missing.
      applyMethod(target, "add", []);
      // @ts-expect-error Incorrect named-method argument type.
      applyMethod(target, "add", ["3"]);
      // @ts-expect-error Too many arguments.
      applyMethod(target, "add", [1, 2]);
      // @ts-expect-error Incorrect supplied-function argument type.
      applyMethod(target, fn, ["3"]);
      // @ts-expect-error The target does not satisfy the function receiver.
      applyMethod(target, incompatible, []);
    }
  });
});
