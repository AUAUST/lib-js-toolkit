import { cached, type Cached, type CachedOptions } from "@auaust/toolkit";
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

  test("resolves a primitive key from all arguments with the shorthand", () => {
    const callback = vi.fn((value: { id: number }, suffix?: string) => {
      return {
        id: value.id,
        suffix,
      };
    });

    const resolveKey = vi.fn((value: { id: number }, suffix?: string) => {
      return JSON.stringify([value.id, suffix]);
    });

    const fn = cached(callback, resolveKey);

    const input = {
      id: 1,
    };

    const result = fn(input, "a");

    const key = JSON.stringify([1, "a"]);

    const equivalentInput = {
      id: 1,
    };

    expect(fn(equivalentInput, "a")).toBe(result);
    expect(fn(input, "b")).not.toBe(result);
    expect(resolveKey).toHaveBeenCalledTimes(3);
    expect(resolveKey).toHaveBeenNthCalledWith(1, input, "a");
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, input, "a");
    expect(fn.value(key)).toBe(result);
    expect(fn.has(key)).toBe(true);
    expect(fn.delete(key)).toBe(true);
    expect(fn.has(key)).toBe(false);

    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(fn).parameters.toEqualTypeOf<
      [value: { id: number }, suffix?: string]
    >();
    expectTypeOf(fn).toEqualTypeOf<Cached<typeof callback, string>>();
  });

  test.each([false, true])(
    "respects cachePrimitives %s when resolveKey is in options",
    (cachePrimitives) => {
      const callback = vi.fn((value: number) => {
        return {
          value,
        };
      });
      const fn = cached(callback, {
        resolveKey: (value) => String(value),
        cachePrimitives,
      });
      const first = fn(1);
      const second = fn(1);

      expect(first === second).toBe(cachePrimitives);
      expect(fn.has("1")).toBe(cachePrimitives);
      expect(fn.value("1")).toBe(cachePrimitives ? first : undefined);
      expect(callback).toHaveBeenCalledTimes(cachePrimitives ? 1 : 2);

      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    },
  );

  test("does not enable primitive caching by default for resolveKey options", () => {
    const callback = vi.fn((value: number) => value);
    const options: CachedOptions<typeof callback, string> = {
      resolveKey: (value) => String(value),
    };
    const fn = cached(callback, options);

    fn(1);
    fn(1);

    expect(fn.has("1")).toBe(false);
    expect(callback).toHaveBeenCalledTimes(2);
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
  });

  test("uses object and function keys resolved from a later argument", () => {
    const callback = vi.fn((value: number, key: object) => value);
    const fn = cached(callback, {
      resolveKey: (_value, key) => key,
    });

    for (const key of [{}, () => {}]) {
      expect(fn(1, key)).toBe(1);
      expect(fn(2, key)).toBe(1);
      expect(fn.value(key)).toBe(1);
      expect(fn.has(key)).toBe(true);
    }

    fn.clear();

    expect(callback).toHaveBeenCalledTimes(2);
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<object>();
  });

  test("undefined resolved keys bypass cache reads and writes", () => {
    const callback = vi.fn((_input: number) => {
      return {};
    });
    const fn = cached(callback, () => undefined);

    expect(fn(1)).not.toBe(fn(1));
    expect(fn.has(undefined)).toBe(false);
    expect(fn.value(undefined)).toBeUndefined();
    expect(fn.delete(undefined)).toBe(false);
    expect(callback).toHaveBeenCalledTimes(2);
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<undefined>();
  });

  test.each([null, false, 0, "", NaN, 1n, Symbol("key")])(
    "caches falsy and primitive resolved key %s",
    (key) => {
      const callback = vi.fn((_input: number) => undefined);
      const fn = cached(callback, () => key);

      expect(fn(1)).toBeUndefined();
      expect(fn(2)).toBeUndefined();
      expect(fn.has(key)).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
    },
  );

  test.each([false, true])(
    "resolves callable key methods once with options form %s",
    (optionsForm) => {
      const keyResolver = {
        prefix: "key:",
        [callable](value: number) {
          return `${this.prefix}${value}`;
        },
      };

      const callback = vi.fn((value: number) => value * 2);

      const fn = optionsForm
        ? cached(callback, {
            resolveKey: keyResolver,
            cachePrimitives: true,
          })
        : cached(callback, keyResolver);

      keyResolver[callable] = () => {
        throw new Error("The retained key method should be used");
      };

      expect(fn(2)).toBe(4);
      expect(fn(2)).toBe(4);
      expect(fn.keyFor(2)).toBe("key:2");
      expect(fn.value(fn.keyFor(2))).toBe(4);
      expect(callback).toHaveBeenCalledTimes(1);

      const context = {
        prefix: "explicit:",
      };

      expect(Reflect.apply(fn, context, [2])).toBe(4);
      expect(fn.has("explicit:2")).toBe(false);
      expect(Reflect.apply(fn.keyFor, context, [2])).toBe("key:2");

      keyResolver.prefix = "new:";

      expect(fn(2)).toBe(4);
      expect(fn.has("new:2")).toBe(true);

      fn.clear();

      expect(fn(2)).toBe(4);
      expect(callback).toHaveBeenCalledTimes(3);
      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    },
  );

  test("keyFor defaults to the first argument without evaluating values", () => {
    const callback = vi.fn((key: object, _suffix?: string) => key);
    const fn = cached(callback);
    const key = {};

    expect(fn.keyFor(key, "suffix")).toBe(key);
    expect(callback).not.toHaveBeenCalled();
    expect(fn.has(key)).toBe(false);
    expect(fn(key)).toBe(fn.value(fn.keyFor(key)));
    expectTypeOf(fn.keyFor).parameters.toEqualTypeOf<
      [key: object, _suffix?: string]
    >();
    expectTypeOf(fn.keyFor).returns.toEqualTypeOf<object>();
  });

  test("keyFor resolves keys for cache inspection without computing values", () => {
    const callback = vi.fn((_input: number, _key?: "entry") => undefined);
    const fn = cached(callback, (_input, key) => key);

    expect(fn.keyFor(1, "entry")).toBe("entry");
    expect(fn.keyFor(1)).toBeUndefined();
    expect(fn.has(fn.keyFor(1, "entry"))).toBe(false);
    expect(callback).not.toHaveBeenCalled();

    fn(1, "entry");

    expect(fn.has(fn.keyFor(2, "entry"))).toBe(true);
    expect(fn.value(fn.keyFor(2, "entry"))).toBeUndefined();
    expect(fn.delete(fn.keyFor(2, "entry"))).toBe(true);
    expect(fn.has(fn.keyFor(1, "entry"))).toBe(false);
    expect(callback).toHaveBeenCalledTimes(1);
    expectTypeOf(fn.keyFor).returns.toEqualTypeOf<"entry" | undefined>();
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<"entry" | undefined>();
  });

  test("retains separate callable holders for values and keys", () => {
    const callback = {
      prefix: "value:",
      [callable](value: number) {
        return this.prefix + value;
      },
    };

    const keyResolver = {
      prefix: "key:",
      [callable](value: number) {
        return this.prefix + value;
      },
    };

    const fn = cached(callback, keyResolver);

    const context = {
      prefix: "explicit:",
    };

    keyResolver[callable] = () => {
      throw new Error("The retained method should be used");
    };

    expect(Reflect.apply(fn.keyFor, context, [1])).toBe("key:1");
    expect(fn.has(fn.keyFor(1))).toBe(false);
    expect(Reflect.apply(fn, context, [1])).toBe("value:1");
    expect(fn.value(fn.keyFor(1))).toBe("value:1");
    expectTypeOf(fn.keyFor).thisParameter.toEqualTypeOf<void>();
    expectTypeOf(fn.keyFor).returns.toEqualTypeOf<string>();
    expectTypeOf(fn.call).parameter(0).toEqualTypeOf<void>();
  });

  test("keeps a nullary callable bound to its holder", () => {
    const holder = {
      value: 5,
      [callable]() {
        return this.value;
      },
    };
    const fn = cached(holder);
    const owner = {
      cache: fn,
    };

    expect(fn()).toBe(5);
    expect(owner.cache()).toBe(5);
    expect(
      Reflect.apply(
        fn,
        {
          value: 0,
        },
        [],
      ),
    ).toBe(5);

    if (false) {
      // @ts-expect-error Callable holder receivers cannot be overridden.
      fn.call({ value: 0 });
    }
  });

  test("rejects contextual function resolvers and caller receiver overrides", () => {
    function contextual(this: { value: number }, key: number) {
      return this.value + key;
    }

    const fn = cached((key: number) => key);

    if (false) {
      // @ts-expect-error Function value resolvers cannot require a receiver.
      cached(contextual);

      // @ts-expect-error Function key resolvers cannot require a receiver.
      cached((key: number) => key, contextual);

      cached((key: number) => key, {
        // @ts-expect-error Options key resolvers cannot require a receiver.
        resolveKey: contextual,
      });

      // @ts-expect-error Cache receivers cannot be overridden.
      fn.call({ value: 0 }, 1);

      // @ts-expect-error Key resolver receivers cannot be overridden.
      fn.keyFor.call({ value: 0 }, 1);
    }
  });

  test("propagates key resolver errors without calling the value resolver", () => {
    const error = new Error("key failed");
    const callback = vi.fn((value: number) => value);
    const fn = cached(callback, () => {
      throw error;
    });

    expect(() => fn(1)).toThrow(error);
    expect(callback).not.toHaveBeenCalled();
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

    const wrapped = cached(callback, {
      cachePrimitives: true,
    });

    expectTypeOf(wrapped).parameters.toEqualTypeOf<
      [key: "entry", count?: number, ...suffixes: string[]]
    >();

    expectTypeOf(wrapped).thisParameter.toEqualTypeOf<void>();

    expectTypeOf(wrapped).returns.toEqualTypeOf<string>();

    expectTypeOf(wrapped.has).parameter(0).toEqualTypeOf<"entry">();

    expectTypeOf(wrapped.value).returns.toEqualTypeOf<string | undefined>();

    expect(wrapped("entry", 2, "?")).toBe("!entry:2?");
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

    expect(Reflect.apply(wrapped, context, ["explicit", 4]).value).toBe(8);

    callback.factor = 10;

    expect(wrapped("new", 4).value).toBe(40);

    wrapped.clear();

    expect(wrapped("own", 5).value).toBe(50);
  });
});
