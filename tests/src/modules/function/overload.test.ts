import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { overload } from "@auaust/toolkit/function";
import { otherObjectsLeaf, typeParents } from "@auaust/toolkit/guard/constants";
import { keys } from "@auaust/toolkit/object";

import { createTypeLeafValues } from "#tests/fixtures/values";
import { typeChainOf } from "#tests/testutils/typeChainOf";

describe("overload", () => {
  test("calls the trap of each leaf", () => {
    const traps = {
      undefined: () => "undefined",
      null: () => "null",
      string: () => "string",
      boolean: () => "boolean",
      number: () => "number",
      bigint: () => "bigint",
      symbol: () => "symbol",
      function: () => "function",
      array: () => "array",
      object: () => "object",
    } as const;

    const fn = overload(traps);

    expect(fn(undefined)).toBe("undefined");
    expect(fn(null)).toBe("null");
    expect(fn("a")).toBe("string");
    expect(fn(true)).toBe("boolean");
    expect(fn(1)).toBe("number");
    expect(fn(1n)).toBe("bigint");
    expect(fn(Symbol("a"))).toBe("symbol");
    expect(fn(() => {})).toBe("function");
    expect(fn([])).toBe("array");
    expect(fn(new Proxy([], {}))).toBe("array");
    expect(fn({})).toBe("object");
  });

  test.for(createTypeLeafValues())(
    "reaches the deepest defined trap of case %# (%s)",
    (value) => {
      const chain = typeChainOf(value);

      for (const name of keys(typeParents)) {
        if (name === otherObjectsLeaf || name === "unknown") {
          continue;
        }

        const traps = { [name]: () => name, unknown: () => "unknown" };
        const fn = overload(traps as { unknown(): string });

        expect(fn(value), name).toBe(chain.includes(name) ? name : "unknown");
      }
    },
  );

  test("keeps null out of object and arrays in object without an array trap", () => {
    const fn = overload({
      object: () => "object",
      nullish: () => "nullish",
    });

    expect(fn(null)).toBe("nullish");
    expect(fn([])).toBe("object");
    expect(fn({})).toBe("object");
    // @ts-expect-error no trap takes functions.
    expect(() => fn(() => {})).toThrow(TypeError);
  });

  test("sends a group's other leaves to it beside a deeper trap", () => {
    const fn = overload({
      string: (value) => `string ${value}`,
      primitive: (value) => `primitive ${String(value)}`,
    });

    expect(fn("a")).toBe("string a");
    expect(fn(1)).toBe("primitive 1");
    expect(fn(null)).toBe("primitive null");
    // @ts-expect-error no trap takes objects.
    expect(() => fn({})).toThrow(TypeError);
  });

  test("throws at definition on invalid traps", () => {
    expect(() => {
      return overload({
        // @ts-expect-error `default` and `unknown` both name the root.
        default: () => 1,
        unknown: () => 2,
      });
    }).toThrow(TypeError);

    expect(() => {
      return overload({
        null: () => 1,
        undefined: () => 2,
        // @ts-expect-error `nullish` is unreachable beside `null` and `undefined`.
        nullish: () => 3,
      });
    }).toThrow(TypeError);

    expect(() => {
      return overload({
        // @ts-expect-error `(object)` is no type name.
        [otherObjectsLeaf]: () => 1,
      });
    }).toThrow(TypeError);

    expect(() => {
      return overload({
        // @ts-expect-error a trap must be a function.
        string: 1,
      });
    }).toThrow(TypeError);
  });

  test("throws a TypeError on a value without trap", () => {
    const fn = overload({
      string: (value) => value,
      number: (value) => value,
    });

    // @ts-expect-error no trap takes booleans.
    expect(() => fn(true)).toThrow(
      new TypeError(
        "Expected a value handled by string, number, received boolean.",
      ),
    );
  });

  test("forwards this and every argument and returns the trap's result", () => {
    const trap = vi.fn(function (
      this: { name: string },
      value: string,
      count: number,
    ) {
      return {
        name: this.name,
        value,
        count,
      };
    });

    const fn = overload({ string: trap });
    const target = { name: "target", fn };
    const result = target.fn("a", 2);

    expect(result).toStrictEqual({
      name: "target",
      value: "a",
      count: 2,
    });

    expect(trap).toHaveBeenCalledWith("a", 2);
    expect(trap.mock.contexts[0]).toBe(target);
    expect(trap.mock.results[0]?.value).toBe(result);

    expectTypeOf(result).toEqualTypeOf<{
      name: string;
      value: string;
      count: number;
    }>();
  });

  test("tells whether it has a trap for a value", () => {
    const fn = overload({
      string: (value) => value.length,
      array: (value) => value.length,
    });

    const value: unknown = "abc";

    expect(fn.handles(value)).toBe(true);
    expect(fn.handles(1)).toBe(false);
    expect(fn.handles({})).toBe(false);

    if (!fn.handles(value)) {
      return;
    }

    expectTypeOf(value).toEqualTypeOf<string | readonly unknown[]>();
    expect(fn(value)).toBe(3);
  });

  test("accepts the union of its traps' inputs and returns their outputs", () => {
    const double = overload({
      string: (value) => value.repeat(2),
      number: (value) => value * 2,
      symbol: (value) => String(value),
    });

    expectTypeOf(double("a")).toEqualTypeOf<string>();
    expectTypeOf(double(2)).toEqualTypeOf<number>();

    function doubleEither(value: number | string) {
      return double(value);
    }

    expectTypeOf(doubleEither).returns.toEqualTypeOf<number | string>();

    // @ts-expect-error no trap takes booleans.
    expect(() => double(true)).toThrow(TypeError);
  });

  test("types a group trap's input without its deeper traps' leaves", () => {
    overload({
      string: (value) => {
        expectTypeOf(value).toEqualTypeOf<string>();
      },
      primitive: (value) => {
        expectTypeOf(value).toEqualTypeOf<
          undefined | null | boolean | number | bigint | symbol
        >();
      },
      default: (value) => {
        expectTypeOf(value).toEqualTypeOf<
          object | readonly unknown[] | ((...args: unknown[]) => unknown)
        >();
      },
    });
  });

  test("accepts only a trap's narrowed input", () => {
    const fn = overload({
      string: (value: "a" | "b") => value,
      number: (value) => value,
    });

    expectTypeOf(fn("a")).toEqualTypeOf<"a" | "b">();

    // @ts-expect-error the string trap takes "a" and "b" only.
    expect(fn("c")).toBe("c");
  });

  test("checks extra arguments against every reachable trap", () => {
    const compatible = overload({
      boolean: (value: boolean) => value,
      symbol: (value: symbol, label: string) => `${String(value)} ${label}`,
    });

    const value = true as boolean | symbol;

    expectTypeOf(compatible(value, "label")).toEqualTypeOf<boolean | string>();

    // @ts-expect-error the symbol trap takes a string label.
    compatible(value, 1);

    const incompatible = overload({
      boolean: (value: boolean, count: number) => count,
      symbol: (value: symbol, label: string) => label,
    });

    expectTypeOf(incompatible(true, 1)).toEqualTypeOf<number>();
    expectTypeOf(incompatible(Symbol("a"), "label")).toEqualTypeOf<string>();

    // @ts-expect-error no argument fits both traps' second parameter.
    incompatible(value, 1);

    const args = [true, 1] as [boolean, number] | [symbol, string];

    expectTypeOf(incompatible(...args)).toEqualTypeOf<number | string>();
  });
});
