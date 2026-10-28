import { describe, expect, expectTypeOf, test } from "vitest";

import { memberValue } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("memberValue", () => {
  test("returns the value of the specified property if it exists", () => {
    expect(
      memberValue(
        {
          a: 42,
        },
        "a",
      ),
    ).toBe(42);

    // @ts-expect-error
    expect(memberValue({}, "a")).toBeUndefined();
  });

  test("executes a method if the property is a function", () => {
    const object = {
      a() {
        return 42;
      },
    };

    const value = memberValue(object, "a");

    expect(value).toBe(42);
    expectTypeOf(value).toBeNumber();
  });

  test("provides the correct `this` context to methods and getters", () => {
    const object = {
      value: 42,
      getValue(multiplier: number) {
        if (multiplier === undefined) {
          throw new Error("Multiplier is required");
        }

        return this.value * multiplier;
      },
      get doubleValue() {
        return this.value * 2;
      },
    };

    const value = memberValue(object, "value");

    expect(value).toBe(42);
    expectTypeOf(value).toBeNumber();

    expect(() => {
      // @ts-expect-error

      return memberValue(object, "getValue");
    }).toThrow("Multiplier is required");

    const getValue = memberValue(object, "getValue", 0.5);

    expect(getValue).toBe(21);
    expectTypeOf(getValue).toBeNumber();

    const doubleValue = memberValue(object, "doubleValue");

    expect(doubleValue).toBe(84);
    expectTypeOf(doubleValue).toBeNumber();

    const object2 = {
      value: 4,
      [callable]() {
        return this.value * 4;
      },
      get method() {
        return {
          get [callable]() {
            return object2[callable];
          },
        };
      },
    };

    const method = memberValue(object2, "method");

    expect(method).toBe(16);
    expectTypeOf(method).toBeNumber();
  });

  test("forwards arguments to method member", () => {
    const object = {
      sum(a: number, b: number) {
        return a + b;
      },
    };

    expect(memberValue(object, "sum", 2, 3)).toBe(5);

    // @ts-expect-error
    expect(memberValue(object, "sum", "2", "3")).toBe("23");
  });

  test("supports methods that are implemented by the `Callable` protocol", () => {
    const simpleObject = {};

    const object = {
      value: 3,
      doubleValue: {
        [callable](this: { value: number }) {
          return this.value * 2;
        },
      },
      simpleProperty: simpleObject,
    };

    expect(memberValue(object, "doubleValue")).toBe(6);
    expect(memberValue(object, "simpleProperty")).toBe(simpleObject);
  });

  test("correctly types member values", () => {
    const symbol = Symbol();

    const source: {
      [string: string]: number;
      [symbol: symbol]: string;
    } = {
      existing: 42,
      [symbol]: "hello",
    };

    const missingString = memberValue(source, "missing");

    expectTypeOf(missingString).toBeNumber();
    expect(missingString).toBeUndefined();

    const missingSymbol = memberValue(source, Symbol());

    expectTypeOf(missingSymbol).toBeString();
    expect(missingSymbol).toBeUndefined();

    const existingString = memberValue(source, "existing");

    expectTypeOf(existingString).toBeNumber();
    expect(existingString).toBe(42);

    const existingSymbol = memberValue(source, symbol);

    expectTypeOf(existingSymbol).toBeString();
    expect(existingSymbol).toBe("hello");
  });
});
