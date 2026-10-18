import { cached } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("cached()", () => {
  test("caches object results with weak references by default", () => {
    const fn = cached((key: string) => ({ value: Math.random() }));

    expect(fn("a")).toBe(fn("a"));
    expect(fn("b").value).toBe(fn("b").value);
  });

  test("does not cache primitive results by default", () => {
    const fn = cached((key: string) => Math.random());

    expect(fn("a")).not.toBe(fn("a"));
    expect(fn("b")).not.toBe(fn("b"));
  });

  test("can cache primitive results when cachePrimitive is true", () => {
    const fn = cached((key: string) => Math.random(), {
      cachePrimitives: true,
    });

    expect(fn("a")).toBe(fn("a"));
    expect(fn("b")).toBe(fn("b"));
    expect(fn("a")).not.toBe(fn("b"));
  });

  test("exposes a clear method to clear the cache", () => {
    const fn = cached((key: string) => Math.random(), {
      cachePrimitives: true,
    });

    const firstA = fn("a");
    const firstB = fn("b");

    fn.clear();

    const secondA = fn("a");
    const secondB = fn("b");

    expect(firstA).not.toBe(secondA);
    expect(firstB).not.toBe(secondB);
  });

  test("exposes the size of the cache", () => {
    const fn = cached((key: string) => Math.random(), {
      cachePrimitives: true,
    });

    expect(fn.size).toBe(0);

    fn("a");
    expect(fn.size).toBe(1);

    fn("b");
    expect(fn.size).toBe(2);

    fn("a");
    expect(fn.size).toBe(2);

    fn.clear();
    expect(fn.size).toBe(0);
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

    const wrapped = cached(callback);

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

    const wrapped = cached(callback);
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
});
