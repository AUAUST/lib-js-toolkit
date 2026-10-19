import { memoized, type Memoized, type MemoizedOptions } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("memoized()", () => {
  test("caches every result, including primitives", () => {
    const fn = memoized((key: string) => Math.random());

    expect(fn("a")).toBe(fn("a"));
    expect(fn("a")).not.toBe(fn("b"));
  });

  test("caches undefined values", () => {
    let calls = 0;
    const fn = memoized((_key: string) => (calls++, undefined));

    expect(fn("a")).toBeUndefined();
    expect(fn("a")).toBeUndefined();
    expect(calls).toBe(1);
    expect(fn.has("a")).toBe(true);
    expect(fn.value("a")).toBeUndefined();
  });

  test.each([false, true])(
    "resolves keys from all arguments with options form %s",
    (optionsForm) => {
      const callback = vi.fn((input: { id: number }, suffix?: string) => {
        return {
          input,
          suffix,
        };
      });
      const resolveKey = vi.fn((input: { id: number }, suffix?: string) => {
        return JSON.stringify([input.id, suffix]);
      });
      const fn = optionsForm
        ? memoized(callback, {
            resolveKey,
          })
        : memoized(callback, resolveKey);
      const input = {
        id: 1,
      };
      const equivalent = {
        id: 1,
      };
      const key = JSON.stringify([1, "a"]);

      expect(fn.keyFor(input, "a")).toBe(key);
      expect(fn.size).toBe(0);
      expect(callback).not.toHaveBeenCalled();
      expect(fn.value(key)).toBeUndefined();

      const first = fn(input, "a");

      expect(fn(equivalent, "a")).toBe(first);
      expect(fn(input, "b")).not.toBe(first);
      expect(callback).toHaveBeenNthCalledWith(1, input, "a");
      expect(callback).toHaveBeenCalledTimes(2);
      expect(resolveKey).toHaveBeenCalledTimes(4);
      expect(fn.size).toBe(2);
      expect(fn.value(key)).toBe(first);
      expect(fn.has(fn.keyFor(equivalent, "a"))).toBe(true);
      expect(fn.delete(key)).toBe(true);
      expect(fn.has(key)).toBe(false);
      expect(fn.size).toBe(1);

      fn.clear();

      expect(fn.size).toBe(0);
      expect(fn(input, "a")).not.toBe(first);
      expectTypeOf(fn).toEqualTypeOf<Memoized<typeof callback, string>>();
      expectTypeOf(fn.keyFor).returns.toEqualTypeOf<string>();
      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    },
  );

  test("supports typed options and resolves an object key from a later argument", () => {
    const callback = vi.fn((value: number, _key: object) => value);
    const options: MemoizedOptions<typeof callback, object> = {
      resolveKey: (_value, key) => key,
    };
    const fn = memoized(callback, options);

    for (const key of [{}, () => {}]) {
      expect(fn.keyFor(1, key)).toBe(key);
      expect(fn(1, key)).toBe(1);
      expect(fn(2, key)).toBe(1);
      expect(fn.value(key)).toBe(1);
    }

    expect(fn.size).toBe(2);
    expect(callback).toHaveBeenCalledTimes(2);
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<object>();
  });

  test("bypasses caching for undefined resolved keys while caching undefined results", () => {
    const callback = vi.fn((_value: number, _key?: "entry") => undefined);
    const fn = memoized(callback, (_value, key) => key);

    fn(1);
    fn(1);

    expect(fn.size).toBe(0);
    expect(fn.has(undefined)).toBe(false);
    expect(fn.delete(undefined)).toBe(false);
    expect(callback).toHaveBeenCalledTimes(2);

    fn(1, "entry");
    fn(2, "entry");

    expect(fn.has("entry")).toBe(true);
    expect(fn.value("entry")).toBeUndefined();
    expect(fn.size).toBe(1);
    expect(callback).toHaveBeenCalledTimes(3);
    expectTypeOf(fn.keyFor).returns.toEqualTypeOf<"entry" | undefined>();
  });

  test.each([null, false, 0, "", NaN, 1n, Symbol("key")])(
    "caches resolved key %s",
    (key) => {
      const callback = vi.fn((_input: number) => undefined);
      const fn = memoized(callback, () => key);

      fn(1);
      fn(2);

      expect(fn.has(key)).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(fn.size).toBe(1);
    },
  );

  test.each([false, true])(
    "resolves callable key methods once with options form %s",
    (optionsForm) => {
      const callback = {
        value: 5,
        [callable](key: number) {
          return this.value * key;
        },
      };
      const keyResolver = {
        prefix: "key:",
        [callable](key: number) {
          return this.prefix + key;
        },
      };
      const fn = optionsForm
        ? memoized(callback, {
            resolveKey: keyResolver,
          })
        : memoized(callback, keyResolver);
      const context = {
        value: 0,
        prefix: "wrong:",
      };

      keyResolver[callable] = () => {
        throw new Error("The retained key method should be used");
      };

      expect(Reflect.apply(fn.keyFor, context, [2])).toBe("key:2");
      expect(Reflect.apply(fn, context, [2])).toBe(10);
      expect(fn.value(fn.keyFor(2))).toBe(10);

      keyResolver.prefix = "new:";
      callback.value = 10;

      expect(fn(2)).toBe(20);
      expect(fn.size).toBe(2);
      expect(fn.value("key:2")).toBe(10);

      fn.clear();

      expect(fn.keyFor(2)).toBe("new:2");
      expect(fn(2)).toBe(20);
      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    },
  );

  test("propagates key resolver failures without computing or caching a value", () => {
    const error = new Error("key failed");
    const callback = vi.fn((value: number) => value);
    const fn = memoized(callback, () => {
      throw error;
    });

    expect(() => fn.keyFor(1)).toThrow(error);
    expect(() => fn(1)).toThrow(error);
    expect(callback).not.toHaveBeenCalled();
    expect(fn.size).toBe(0);
  });

  test("ignores caller receivers and caches by key", () => {
    const receivers: unknown[] = [];

    function callback(this: unknown, key: number) {
      receivers.push(this);

      return key * 2;
    }

    const fn = memoized(callback);
    const context = {
      multiplier: 4,
      fn,
    };

    expect(context.fn(3)).toBe(6);
    expect(Reflect.apply(fn, context, [4])).toBe(8);
    expect(fn(3)).toBe(6);
    expect(receivers).toEqual([callback, callback]);
  });

  test("exposes cache management methods", () => {
    const fn = memoized((key: string) => key.toUpperCase());

    expect(fn.size).toBe(0);
    expect(fn.value("a")).toBeUndefined();
    expect(fn.has("a")).toBe(false);

    fn("a");
    fn("b");
    expect(fn.size).toBe(2);
    expect(fn.value("a")).toBe("A");
    expect(fn.delete("a")).toBe(true);
    expect(fn.has("a")).toBe(false);

    fn.clear();
    expect(fn.size).toBe(0);
  });

  test("supports `Callable` objects", () => {
    const obj = {
      [callable](mutliplier: number) {
        return this.value * mutliplier;
      },
      value: 42,
    };

    const fn = memoized(obj);

    expect(fn(2)).toBe(84);

    expect(fn.has(2)).toBe(true);

    const context = {
      value: 2,
    };

    expect(Reflect.apply(fn, context, [4])).toBe(168);
    expect(fn(4)).toBe(168);
  });

  test("rejects contextual function callbacks and receiver overrides", () => {
    function contextual(this: { value: number }, key: number) {
      return this.value + key;
    }

    const fn = memoized((key: number) => key);
    const holder = {
      value: 5,
      [callable]() {
        return this.value;
      },
    };
    const wrapped = memoized(holder);
    const owner = {
      fn: wrapped,
    };

    expect(wrapped()).toBe(5);
    expect(owner.fn()).toBe(5);

    const context = {
      value: 0,
    };

    expect(Reflect.apply(wrapped, context, [])).toBe(5);

    if (false) {
      // @ts-expect-error Function callbacks cannot require a receiver.
      memoized(contextual);

      // @ts-expect-error Memoized receivers cannot be overridden.
      fn.call({ value: 0 }, 1);

      // @ts-expect-error Callable holder receivers cannot be overridden.
      wrapped.call({ value: 0 });
    }
  });

  test("preserves inferred callable holder types", () => {
    const holder = {
      value: 5,
      [callable](key: number) {
        return this.value * key;
      },
    };
    const fn = memoized(holder);

    expect(fn(2)).toBe(10);
    expect(fn.call(undefined, 3)).toBe(15);
    expectTypeOf(fn).thisParameter.toEqualTypeOf<unknown>();
    expectTypeOf(fn).parameters.toEqualTypeOf<[key: number]>();
    expectTypeOf(fn).returns.toEqualTypeOf<number>();

    if (false) {
      // @ts-expect-error Callable holder receivers cannot be overridden.
      fn.call({ value: 0 }, 2);
    }
  });

  test("infers cache keys and the full callback signature", () => {
    function callback(
      this: void,
      key: "entry",
      count = 1,
      ...suffixes: string[]
    ) {
      return `!${key}:${count}${suffixes.join("")}`;
    }

    const wrapped = memoized(callback);

    expectTypeOf(wrapped).parameters.toEqualTypeOf<
      [key: "entry", count?: number, ...suffixes: string[]]
    >();

    expectTypeOf(wrapped).thisParameter.toEqualTypeOf<void>();

    expectTypeOf(wrapped).returns.toEqualTypeOf<string>();

    expectTypeOf(wrapped.has).parameter(0).toEqualTypeOf<"entry">();

    expectTypeOf(wrapped.value).returns.toEqualTypeOf<string | undefined>();

    expect(wrapped.call(undefined, "entry", 2, "?")).toBe("!entry:2?");
  });

  test("preserves generic and overloaded cache callbacks", () => {
    function identity<Value>(this: void, value: Value): Value {
      return value;
    }

    function overload(key: string): string;
    function overload(key: number): number;
    function overload(key: string | number): string | number {
      return key;
    }

    const generic = memoized(identity);
    const overloaded = memoized(overload);

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

    const wrapped = memoized(callback);
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
    const nullary = memoized(function () {
      return {
        argumentCount: arguments.length,
      };
    });

    const optional = memoized((key?: "entry") => {
      return key;
    });

    expect(nullary.keyFor()).toBeUndefined();
    expect(nullary().argumentCount).toBe(0);
    expect(nullary.has(undefined)).toBe(true);
    expect(nullary.size).toBe(1);
    expectTypeOf(nullary.keyFor).returns.toEqualTypeOf<undefined>();

    expectTypeOf(nullary.has).parameter(0).toEqualTypeOf<undefined>();

    expectTypeOf(optional.has)
      .parameter(0)
      .toEqualTypeOf<"entry" | undefined>();

    expect(optional()).toBeUndefined();

    expect(optional("entry")).toBe("entry");
  });

  test("retains the resolved protocol method and ignores caller receivers", () => {
    const callback = {
      factor: 2,
      [callable](key: string, count: number) {
        return {
          key,
          value: this.factor * count,
        };
      },
    };
    const wrapped = memoized(callback);

    callback[callable] = () => {
      throw new Error("The retained method should be used");
    };

    expect(wrapped("own", 4).value).toBe(8);

    const context = {
      factor: 3,
    };

    expect(Reflect.apply(wrapped, context, ["explicit", 4]).value).toBe(8);

    callback.factor = 10;

    expect(wrapped("new", 4).value).toBe(40);

    wrapped.clear();

    expect(wrapped("own", 5).value).toBe(50);
  });
});
