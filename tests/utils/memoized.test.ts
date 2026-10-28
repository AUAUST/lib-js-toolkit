import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { memoized, type Memoized, type MemoizedOptions } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

import {
  createSpies,
  genericIdentity,
  overloaded,
  signature,
} from "../fixtures/callbacks";
import {
  createFunctions,
  createObjects,
  createValues,
  primitiveValues,
} from "../fixtures/values";

describe("memoized", () => {
  test.for(createValues())("caches result %s and manages entries", (value) => {
    const callback = vi.fn((_key: string) => value);
    const fn = memoized(callback);

    expect(fn.size).toBe(0);
    expect(fn.has("a")).toBe(false);
    expect(fn.value("a")).toBeUndefined();
    expect(fn("a")).toBe(value);
    expect(fn("a")).toBe(value);
    expect(fn("b")).toBe(value);
    expect(fn.size).toBe(2);
    expect(fn.has("a")).toBe(true);
    expect(fn.value("a")).toBe(value);
    expect(fn.delete("a")).toBe(true);
    expect(fn.has("a")).toBe(false);
    expect(fn.size).toBe(1);
    expect(callback).toHaveBeenCalledTimes(2);
    expectTypeOf(fn).returns.toEqualTypeOf<typeof value>();

    fn.clear();

    expect(fn.size).toBe(0);
    expect(fn.has("b")).toBe(false);
  });

  test.each(["nextString", "freshObject", "sameObject"] as const)(
    "retains %s results until cleared",
    (behavior) => {
      const callback = createSpies()[behavior];
      const fn = memoized(callback);
      const first = fn("a");
      const second = fn("b");

      expect(fn("a")).toBe(first);
      expect(first === second).toBe(behavior === "sameObject");
      expect(callback).toHaveBeenCalledTimes(2);

      fn.clear();

      expect(fn("a") === first).toBe(behavior === "sameObject");
      expect(callback).toHaveBeenCalledTimes(3);
    },
  );

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

  test.for([...primitiveValues, ...createObjects(), ...createFunctions()])(
    "resolves key %s from a later argument",
    (key) => {
      const callback = vi.fn((value: number, _key: typeof key) => value);

      const options: MemoizedOptions<typeof callback, typeof key> = {
        resolveKey: (_value, key) => key,
      };

      const fn = memoized(callback, options);

      expect(fn.keyFor(1, key)).toBe(key);
      expect(fn(1, key)).toBe(1);
      expect(fn(2, key)).toBe(key === undefined ? 2 : 1);
      expect(fn.value(key)).toBe(key === undefined ? undefined : 1);
      expect(fn.size).toBe(key === undefined ? 0 : 1);
      expect(callback).toHaveBeenCalledTimes(key === undefined ? 2 : 1);
      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<typeof key>();
    },
  );

  test("bypasses caching for undefined resolved keys while caching undefined results", () => {
    const callback = vi.fn((_value: number, _key?: "entry") => {});
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

  test("retains callable methods, holder types, and receiver binding", () => {
    const holder = {
      value: 5,
      [callable](key: number) {
        return this.value * key;
      },
    };

    const fn = memoized(holder);

    const context = {
      value: 99,
    };

    holder[callable] = () => {
      throw new Error("retained method expected");
    };

    expect(fn(2)).toBe(10);
    expect(fn.has(2)).toBe(true);
    expect(fn.call(undefined, 3)).toBe(15);
    expect(Reflect.apply(fn, context, [4])).toBe(20);
    expect(fn(4)).toBe(20);
    expectTypeOf(fn).thisParameter.toEqualTypeOf<unknown>();
    expectTypeOf(fn).parameters.toEqualTypeOf<[key: number]>();
    expectTypeOf(fn).returns.toEqualTypeOf<number>();

    holder.value = 10;

    expect(fn(2)).toBe(10);
    expect(fn(5)).toBe(50);

    fn.clear();

    expect(fn(2)).toBe(20);

    if (false) {
      // @ts-expect-error Callable holder receivers cannot be overridden.
      fn.call(context, 2);
    }
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

    if (!!true) {
      return;
    }

    // @ts-expect-error Function callbacks cannot require a receiver.
    memoized(contextual);

    // @ts-expect-error Memoized receivers cannot be overridden.
    fn.call(context, 1);

    // @ts-expect-error Callable holder receivers cannot be overridden.
    wrapped.call({
      value: 0,
    });
  });

  test("infers cache keys and the full callback signature", () => {
    const wrapped = memoized(signature);

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
    const generic = memoized(genericIdentity);
    const overload = memoized(overloaded);

    expectTypeOf(generic("literal" as const)).toEqualTypeOf<"literal">();
    expectTypeOf(overload("entry")).toEqualTypeOf<string>();
    expectTypeOf(overload(1)).toEqualTypeOf<number>();
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
});
