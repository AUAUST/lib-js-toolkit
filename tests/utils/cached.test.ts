import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { cached, type Cached, type CachedOptions } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

import {
  contextual,
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

describe("cached", () => {
  test.for([...createObjects(), ...createFunctions()])(
    "manages object key %s by identity",
    (key) => {
      const { freshObject: callback } = createSpies();
      const fn = cached(callback);

      expect(fn.keyFor(key)).toBe(key);
      expect(fn.has(key)).toBe(false);
      expect(fn.value(key)).toBeUndefined();
      expect(fn.delete(key)).toBe(false);
      expect(callback).not.toHaveBeenCalled();

      const result = fn(key);

      expect(fn(key)).toBe(result);
      expect(fn.value(key)).toBe(result);
      expect(fn.has(key)).toBe(true);
      expect(fn({})).not.toBe(result);
      expect(fn.delete(key)).toBe(true);
      expect(fn.delete(key)).toBe(false);
      expect(fn.has(key)).toBe(false);
      expect(fn.value(key)).toBeUndefined();
      expect(fn(key)).not.toBe(result);
      expect(callback).toHaveBeenCalledTimes(3);
      expectTypeOf(result).toEqualTypeOf<{}>();
    },
  );

  test.for(createValues())(
    "caches result %s without copying or coercion",
    (result) => {
      const callback = vi.fn((_key: object) => result);
      const fn = cached(callback);
      const key = {};

      expect(fn(key)).toBe(result);
      expect(fn(key)).toBe(result);
      expect(fn.value(key)).toBe(result);
      expect(fn.has(key)).toBe(true);
      expect(callback).toHaveBeenCalledOnce();
      expectTypeOf(fn).returns.toEqualTypeOf<typeof result>();
    },
  );

  test.for(primitiveValues)(
    "caches primitive key %s only when enabled",
    (key) => {
      for (const cachePrimitives of [false, true]) {
        const { freshObject: callback } = createSpies();

        const fn = cached(callback, {
          cachePrimitives,
        });

        const result = fn(key);

        expect(fn(key) === result).toBe(cachePrimitives);
        expect(fn.has(key)).toBe(cachePrimitives);
        expect(fn.value(key)).toBe(cachePrimitives ? result : undefined);
        expect(fn.delete(key)).toBe(cachePrimitives);
        expect(fn.has(key)).toBe(false);
        expect(callback).toHaveBeenCalledTimes(cachePrimitives ? 1 : 2);
      }
    },
  );

  test("clears both stores and permits reuse", () => {
    const { freshObject: callback } = createSpies();

    const fn = cached(callback, {
      cachePrimitives: true,
    });

    const keys = [{}, () => {}, "entry"];
    const results = keys.map((key) => fn(key));

    fn.clear();

    for (const [index, key] of keys.entries()) {
      expect(fn.has(key)).toBe(false);
      expect(fn.value(key)).toBeUndefined();
      expect(fn(key)).not.toBe(results[index]);
      expect(fn(key)).toBe(fn.value(key));
    }

    expect(callback).toHaveBeenCalledTimes(6);
  });

  test.each([false, true])(
    "resolves all arguments in options form %s",
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

      const options: CachedOptions<typeof callback, string> = {
        resolveKey,
        cachePrimitives: true,
      };

      const fn = optionsForm
        ? cached(callback, options)
        : cached(callback, resolveKey);

      const input = {
        id: 1,
      };

      const result = fn(input, "a");
      const key = JSON.stringify([1, "a"]);

      expect(
        fn(
          {
            id: 1,
          },
          "a",
        ),
      ).toBe(result);

      expect(fn(input, "b")).not.toBe(result);
      expect(fn.keyFor(input, "a")).toBe(key);
      expect(fn.value(key)).toBe(result);
      expect(fn.has(key)).toBe(true);
      expect(fn.delete(key)).toBe(true);
      expect(fn.has(key)).toBe(false);
      expect(resolveKey).toHaveBeenCalledTimes(4);
      expect(resolveKey).toHaveBeenNthCalledWith(1, input, "a");
      expect(callback).toHaveBeenNthCalledWith(1, input, "a");
      expect(callback).toHaveBeenCalledTimes(2);
      expectTypeOf(fn).toEqualTypeOf<Cached<typeof callback, string>>();

      expectTypeOf(fn).parameters.toEqualTypeOf<
        [input: { id: number }, suffix?: string]
      >();

      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    },
  );

  test.each([undefined, false, true])(
    "respects options cachePrimitives %s",
    (cachePrimitives) => {
      const { freshObject: callback } = createSpies();

      const fn = cached(callback, {
        resolveKey: String,
        cachePrimitives,
      });

      const first = fn(1);

      expect(fn(1) === first).toBe(!!cachePrimitives);
      expect(fn.has("1")).toBe(!!cachePrimitives);
      expect(fn.value("1")).toBe(cachePrimitives ? first : undefined);
      expect(callback).toHaveBeenCalledTimes(cachePrimitives ? 1 : 2);
      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    },
  );

  test.for([{}, () => {}, ...primitiveValues])(
    "uses resolved key %s from a later argument",
    (key) => {
      const callback = vi.fn((_input: number, _key: typeof key) => {});
      const fn = cached(callback, (_input, key) => key);

      expect(fn.keyFor(1, key)).toBe(key);
      expect(callback).not.toHaveBeenCalled();
      expect(fn(1, key)).toBeUndefined();
      expect(fn(2, key)).toBeUndefined();
      expect(fn.has(key)).toBe(key !== undefined);
      expect(fn.value(key)).toBeUndefined();
      expect(fn.delete(key)).toBe(key !== undefined);
      expect(callback).toHaveBeenCalledTimes(key === undefined ? 2 : 1);
      expectTypeOf(fn.has).parameter(0).toEqualTypeOf<typeof key>();
    },
  );

  test.each([false, true])(
    "retains separate callable holders in options form %s",
    (optionsForm) => {
      const callback = {
        factor: 2,
        [callable](id: number) {
          return this.factor * id;
        },
      };

      const resolver = {
        prefix: "key:",
        [callable](id: number) {
          return this.prefix + id;
        },
      };

      const fn = optionsForm
        ? cached(callback, {
            resolveKey: resolver,
            cachePrimitives: true,
          })
        : cached(callback, resolver);

      const context = {
        factor: 99,
        prefix: "wrong:",
      };

      resolver[callable] = () => {
        throw new Error("retained resolver expected");
      };

      callback[callable] = () => {
        throw new Error("retained callback expected");
      };

      expect(Reflect.apply(fn.keyFor, context, [2])).toBe("key:2");
      expect(Reflect.apply(fn, context, [2])).toBe(4);
      expect(fn.value(fn.keyFor(2))).toBe(4);
      expect(fn.has("wrong:2")).toBe(false);

      callback.factor = 3;

      resolver.prefix = "new:";

      expect(fn(2)).toBe(6);
      expect(fn.value("key:2")).toBe(4);

      fn.clear();

      expect(fn(2)).toBe(6);
      expectTypeOf(fn.keyFor).thisParameter.toEqualTypeOf<void>();
      expectTypeOf(fn.keyFor).returns.toEqualTypeOf<string>();
      expectTypeOf(fn.call).parameter(0).toEqualTypeOf<undefined>();
    },
  );

  test("propagates failures without caching or evaluating values after key errors", () => {
    const failure = new Error("failure");

    const callback = vi.fn((_key: unknown) => {
      throw failure;
    });

    const fn = cached(callback, {
      cachePrimitives: true,
    });

    for (const key of [{}, "entry"]) {
      expect(() => fn(key)).toThrow(failure);
      expect(() => fn(key)).toThrow(failure);
      expect(fn.has(key)).toBe(false);
    }

    expect(callback).toHaveBeenCalledTimes(4);

    const keyed = cached(callback, () => {
      throw failure;
    });

    expect(() => keyed.keyFor(1)).toThrow(failure);
    expect(() => keyed(1)).toThrow(failure);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  test("preserves full signatures, generics, and overloads", () => {
    const fn = cached(signature, {
      cachePrimitives: true,
    });

    const generic = cached(genericIdentity);
    const overload = cached(overloaded);

    expect(fn("entry", 2, "?")).toBe("!entry:2?");

    expectTypeOf(fn).parameters.toEqualTypeOf<
      [key: "entry", count?: number, ...suffixes: string[]]
    >();

    expectTypeOf(fn).thisParameter.toEqualTypeOf<void>();
    expectTypeOf(fn).returns.toEqualTypeOf<string>();
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<"entry">();
    expectTypeOf(fn.value).returns.toEqualTypeOf<string | undefined>();
    expectTypeOf(generic("literal" as const)).toEqualTypeOf<"literal">();
    expectTypeOf(overload("entry")).toEqualTypeOf<string>();
    expectTypeOf(overload(1)).toEqualTypeOf<number>();
  });

  test("preserves callable arguments and types", () => {
    const callback = {
      [callable](key: string, count?: number, ...suffixes: string[]) {
        return {
          key,
          count,
          suffixes,
        };
      },
    };

    const fn = cached(callback, {
      cachePrimitives: true,
    });

    const result = fn("entry", 2, "a", "b");

    expect(result).toEqual({
      key: "entry",
      count: 2,
      suffixes: ["a", "b"],
    });

    expect(fn("entry")).toBe(result);
    expect(fn.value("entry")).toBe(result);

    expectTypeOf(result).toEqualTypeOf<{
      key: string;
      count: number | undefined;
      suffixes: string[];
    }>();
  });

  test("preserves nullary and optional argument lists", () => {
    const nullary = cached(function () {
      return arguments.length;
    });

    const optional = cached((key?: "entry") => key);

    const holder = {
      value: 5,
      [callable]() {
        return this.value;
      },
    };

    const bound = cached(holder);

    const owner = {
      fn: bound,
    };

    expect(nullary()).toBe(0);
    expect(bound()).toBe(5);
    expect(owner.fn()).toBe(5);

    expect(
      Reflect.apply(
        bound,
        {
          value: 0,
        },
        [],
      ),
    ).toBe(5);

    expect(optional()).toBeUndefined();
    expect(optional("entry")).toBe("entry");
    expectTypeOf(nullary.has).parameter(0).toEqualTypeOf<undefined>();

    expectTypeOf(optional.has)
      .parameter(0)
      .toEqualTypeOf<"entry" | undefined>();

    expectTypeOf(optional.keyFor).returns.toEqualTypeOf<"entry" | undefined>();

    if (false) {
      // @ts-expect-error Callable holders cannot have their receiver overridden.
      bound.call({
        value: 0,
      });
    }
  });

  test("rejects required function receivers and receiver overrides", () => {
    const fn = cached((key: number) => key);

    const context = {
      value: 0,
    };

    if (!false) {
      return;
    }

    // @ts-expect-error Function callbacks cannot require a receiver.
    cached(contextual);
    // @ts-expect-error Function key resolvers cannot require a receiver.
    cached((key: number) => key, contextual);

    cached((key: number) => key, {
      // @ts-expect-error Options key resolvers cannot require a receiver.
      resolveKey: contextual,
    });

    // @ts-expect-error Cache receivers cannot be overridden.
    fn.call(context, 1);
    // @ts-expect-error Key resolver receivers cannot be overridden.
    fn.keyFor.call(context, 1);
  });
});
