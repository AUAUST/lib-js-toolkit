import { cached } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("cached()", () => {
  test("caches results for object and function keys by identity", () => {
    const callback = vi.fn((key: object) => {
      return {
        key,
      };
    });
    const fn = cached(callback);
    const objectKey = {};
    const otherKey = {};
    const functionKey = () => {};

    for (const key of [objectKey, otherKey, functionKey]) {
      const result = fn(key);

      expect(fn(key)).toBe(result);
      expect(fn.value(key)).toBe(result);
      expect(fn.has(key)).toBe(true);
    }

    expect(fn(objectKey)).not.toBe(fn(otherKey));
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test.each([undefined, null, false, 0, "", 1n, Symbol("result")])(
    "caches primitive result %s for object keys",
    (result) => {
      const callback = vi.fn((_key: object) => result);
      const fn = cached(callback);
      const key = {};

      expect(fn(key)).toBe(result);
      expect(fn(key)).toBe(result);
      expect(fn.value(key)).toBe(result);
      expect(fn.has(key)).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
    },
  );

  test.each([undefined, null, false, 0, NaN, "", 1n, Symbol("key")])(
    "does not cache primitive key %s by default",
    (key) => {
      const callback = vi.fn((_key: unknown) => {
        return {};
      });
      const fn = cached(callback);

      expect(fn(key)).not.toBe(fn(key));
      expect(fn.value(key)).toBeUndefined();
      expect(fn.has(key)).toBe(false);
      expect(fn.delete(key)).toBe(false);
      expect(callback).toHaveBeenCalledTimes(2);
    },
  );

  test.each([
    undefined,
    null,
    false,
    0,
    NaN,
    "",
    1n,
    Symbol("key"),
    Symbol.for("key"),
  ])("can cache primitive key %s when cachePrimitives is true", (key) => {
    const callback = vi.fn((_key: unknown) => undefined);
    const fn = cached(callback, {
      cachePrimitives: true,
    });

    expect(fn(key)).toBeUndefined();
    expect(fn(key)).toBeUndefined();
    expect(fn.has(key)).toBe(true);
    expect(fn.value(key)).toBeUndefined();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fn.delete(key)).toBe(true);
    expect(fn.has(key)).toBe(false);
  });

  test("clears both key stores and allows them to be reused", () => {
    const callback = vi.fn((_key: unknown) => {
      return {};
    });
    const fn = cached(callback, {
      cachePrimitives: true,
    });
    const keys = [{}, () => {}, "entry"];
    const results = keys.map((key) => fn(key));

    fn.clear();

    for (const [index, key] of keys.entries()) {
      expect(fn.has(key)).toBe(false);
      expect(fn.value(key)).toBeUndefined();

      const result = fn(key);

      expect(result).not.toBe(results[index]);
      expect(fn(key)).toBe(result);
    }

    expect(callback).toHaveBeenCalledTimes(6);
  });

  test("deletes object and function keys", () => {
    const fn = cached((key: object) => key);
    const keys = [{}, () => {}];

    for (const key of keys) {
      expect(fn.delete(key)).toBe(false);
      expect(fn.value(key)).toBeUndefined();
      expect(fn(key)).toBe(key);
    }

    for (const key of keys) {
      expect(fn.delete(key)).toBe(true);
      expect(fn.delete(key)).toBe(false);
      expect(fn.has(key)).toBe(false);
      expect(fn.value(key)).toBeUndefined();
    }
  });

  test("does not cache thrown errors", () => {
    const error = new Error("failed");
    const callback = vi.fn((_key: unknown) => {
      throw error;
    });
    const fn = cached(callback, {
      cachePrimitives: true,
    });

    for (const key of [{}, "entry"]) {
      expect(() => fn(key)).toThrow(error);
      expect(() => fn(key)).toThrow(error);
      expect(fn.has(key)).toBe(false);
    }

    expect(callback).toHaveBeenCalledTimes(4);
  });

  test("exposes a value method to get the cached value for a key", () => {
    const fn = cached((key: string) => Math.random(), {
      cachePrimitives: true,
    });

    expect(fn.value("a")).toBeUndefined();
    expect(fn.value("b")).toBeUndefined();

    const a = fn("a");
    const b = fn("b");

    expect(fn.value("a")).toBe(a);
    expect(fn.value("b")).toBe(b);
  });

  test("exposes a has method to check for cached keys", () => {
    const fn = cached((key: string) => Math.random(), {
      cachePrimitives: true,
    });

    expect(fn.has("a")).toBe(false);

    fn("a");

    expect(fn.has("a")).toBe(true);
    expect(fn.has("b")).toBe(false);

    fn("b");

    expect(fn.has("b")).toBe(true);

    fn.clear();

    expect(fn.has("a")).toBe(false);
    expect(fn.has("b")).toBe(false);
  });

  test("exposes a delete method to remove cached keys", () => {
    const fn = cached((key: string) => Math.random(), {
      cachePrimitives: true,
    });

    fn("a");
    fn("b");

    expect(fn.has("a")).toBe(true);
    expect(fn.has("b")).toBe(true);

    fn.delete("a");

    expect(fn.has("a")).toBe(false);
    expect(fn.has("b")).toBe(true);

    fn.delete("b");

    expect(fn.has("a")).toBe(false);
    expect(fn.has("b")).toBe(false);
  });

  test("infers cache keys and the full callback signature", () => {
    function callback(
      this: { prefix: string },
      key: "entry",
      count = 1,
      ...suffixes: string[]
    ) {
      return `${this.prefix}${key}:${count}${suffixes.join("")}`;
    }

    const wrapped = cached(callback, {
      cachePrimitives: true,
    });

    expectTypeOf(wrapped).parameters.toEqualTypeOf<
      [key: "entry", count?: number, ...suffixes: string[]]
    >();

    expectTypeOf(wrapped).thisParameter.toEqualTypeOf<{ prefix: string }>();

    expectTypeOf(wrapped).returns.toEqualTypeOf<string>();

    expectTypeOf(wrapped.has).parameter(0).toEqualTypeOf<"entry">();

    expectTypeOf(wrapped.value).returns.toEqualTypeOf<string | undefined>();

    const context = {
      prefix: "!",
    };

    expect(wrapped.call(context, "entry", 2, "?")).toBe("!entry:2?");
  });

  test("preserves generic and overloaded cache callbacks", () => {
    function identity<Value>(value: Value): Value {
      return value;
    }

    function overload(key: string): string;
    function overload(key: number): number;
    function overload(key: string | number): string | number {
      return key;
    }

    const generic = cached(identity);
    const overloaded = cached(overload);

    expectTypeOf(generic("literal" as const)).toEqualTypeOf<"literal">();

    expectTypeOf(overloaded("entry")).toEqualTypeOf<string>();

    expectTypeOf(overloaded(1)).toEqualTypeOf<number>();
  });

  test("resolves callable cache callbacks and forwards arguments once", () => {
    const callback = {
      [callable](key: string, count?: number, ...suffixes: string[]) {
        return {
          key,
          count,
          suffixes,
        };
      },
    };

    const wrapped = cached(callback, {
      cachePrimitives: true,
    });
    const result = wrapped("entry", 2, "a", "b");

    expect(result).toEqual({
      key: "entry",
      count: 2,
      suffixes: ["a", "b"],
    });

    expect(wrapped("entry")).toBe(result);

    expect(wrapped.value("entry")).toBe(result);

    expectTypeOf(result).toEqualTypeOf<{
      key: string;
      count: number | undefined;
      suffixes: string[];
    }>();
  });

  test("preserves empty and optional argument lists", () => {
    const nullary = cached(function () {
      return {
        argumentCount: arguments.length,
      };
    });

    const optional = cached((key?: "entry") => {
      return key;
    });

    expect(nullary().argumentCount).toBe(0);

    expectTypeOf(nullary.has).parameter(0).toEqualTypeOf<undefined>();

    expectTypeOf(optional.has)
      .parameter(0)
      .toEqualTypeOf<"entry" | undefined>();

    expect(optional()).toBeUndefined();

    expect(optional("entry")).toBe("entry");
  });

  test("retains the resolved protocol method and forwards explicit receivers", () => {
    const callback = {
      factor: 2,
      [callable](key: string, count: number) {
        return {
          key,
          value: this.factor * count,
        };
      },
    };

    const wrapped = cached(callback, {
      cachePrimitives: true,
    });

    callback[callable] = () => {
      throw new Error("The retained method should be used");
    };

    expect(wrapped("own", 4).value).toBe(8);

    const context = {
      factor: 3,
    };

    expect(wrapped.call(context, "explicit", 4).value).toBe(12);

    callback.factor = 10;

    expect(wrapped("new", 4).value).toBe(40);

    wrapped.clear();

    expect(wrapped("own", 5).value).toBe(50);
  });
});
