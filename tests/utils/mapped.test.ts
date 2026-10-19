import { callable } from "@auaust/toolkit/protocols/callable";
import { mapped } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

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
      (value) => value + 5,
    );

    expect(result).toEqual({ alpha: 6, beta: 7, c: 8 });
  });

  test("excludes keys marked false in an explicit map", () => {
    const result = mapped({ foo: 1, bar: 2 }, { foo: false });

    expect(result).toEqual({ bar: 2 });
    // @ts-expect-error
    result.foo;
    result.bar;
  });

  test("excludes or retains keys based on mapper function control values", () => {
    const result = mapped({ foo: 1, bar: 2, baz: 3 }, (key) => {
      if (key === "foo") return undefined;
      if (key === "bar") return true;
      return "renamed";
    });

    expect(result).toEqual({ bar: 2, renamed: 3 });
  });

  test("passes values to the key mapper and both keys to the transformer", () => {
    const mapperCalls: unknown[][] = [];
    const transformerCalls: unknown[][] = [];

    const result = mapped(
      { foo: 1, bar: 2 },
      (key, value) => {
        mapperCalls.push([key, value]);
        return key === "foo" ? "renamed" : true;
      },
      (value, key, sourceKey) => {
        transformerCalls.push([value, key, sourceKey]);
        return `${String(key)}:${value}`;
      },
    );

    expect(mapperCalls).toEqual([
      ["foo", 1],
      ["bar", 2],
    ]);

    expect(transformerCalls).toEqual([
      [1, "renamed", "foo"],
      [2, "bar", "bar"],
    ]);

    expect(result).toEqual({ renamed: "renamed:1", bar: "bar:2" });
  });

  test("accepts callable key mappers and preserves literal keys", () => {
    const mapper = {
      key: "renamed" as const,
      [callable](_key: "entry", _value: number) {
        return this.key;
      },
    };
    const result = mapped({
      entry: 4,
    }, mapper);

    expectTypeOf(result).toEqualTypeOf<Record<"renamed", number>>();
    expect(result).toEqual({
      renamed: 4,
    });
  });

  test("accepts callable value transformers and preserves result types", () => {
    const transformer = {
      factor: 2,
      [callable](value: number, key: "entry", sourceKey: "entry") {
        return `${value * this.factor}:${key}:${sourceKey}`;
      },
    };
    const result = mapped({
      entry: 4,
    }, undefined, transformer);

    expectTypeOf(result).toEqualTypeOf<{
      entry: string;
    }>();
    expect(result).toEqual({
      entry: "8:entry:entry",
    });
  });

  test("combines callable key and value transformations", () => {
    const result = mapped({
      entry: 4,
    }, {
      [callable](key: "entry", _value: number) {
        return "renamed" as const;
      },
    }, {
      [callable](value, key, sourceKey) {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(key).toEqualTypeOf<"renamed">();
        expectTypeOf(sourceKey).toEqualTypeOf<"entry">();

        return `${value}:${key}:${sourceKey}`;
      },
    });

    expectTypeOf(result).toEqualTypeOf<Record<"renamed", string>>();
    expect(result.renamed).toBe("4:renamed:entry");
  });
});
