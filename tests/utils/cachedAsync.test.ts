import { after, cachedAsync, defer, type CachedAsync } from "@auaust/toolkit";
import { cachedAsync as cachedAsyncSubpath } from "@auaust/toolkit/cachedAsync";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("cachedAsync()", () => {
  test("shares pending promises and returns fulfilled values synchronously", async () => {
    const work = defer<number>();
    const callback = vi.fn((_key: object): Promise<number> => work);
    const fn = cachedAsync(callback);
    const key = {};

    expect(cachedAsyncSubpath).toBe(cachedAsync);
    expect(fn.has(key)).toBe(false);
    expect(fn.pending(key)).toBe(false);
    expect(fn.settled(key)).toBe(false);
    expect(fn.value(key)).toBeUndefined();

    const promise = fn(key);

    expect(fn(key)).toBe(promise);
    expect(promise).not.toBe(work);
    expect(fn.has(key)).toBe(true);
    expect(fn.pending(key)).toBe(true);
    expect(fn.settled(key)).toBe(false);
    expect(fn.value(key)).toBeUndefined();

    work.resolve(42);

    expect(await promise).toBe(42);
    expect(fn(key)).toBe(42);
    expect(fn.value(key)).toBe(42);
    expect(fn.has(key)).toBe(true);
    expect(fn.pending(key)).toBe(false);
    expect(fn.settled(key)).toBe(true);
    expect(callback).toHaveBeenCalledTimes(1);
    expectTypeOf(fn).toEqualTypeOf<CachedAsync<typeof callback>>();
    expectTypeOf(fn).returns.toEqualTypeOf<number | Promise<number>>();
    expectTypeOf(fn.value).returns.toEqualTypeOf<number | undefined>();
  });

  test.each([undefined, null, false, 0, "", 1n])(
    "recognizes fulfilled value %s",
    async (result) => {
      const callback = vi.fn(async (_key: object) => result);
      const fn = cachedAsync(callback);
      const key = {};

      await fn(key);

      expect(fn(key)).toBe(result);
      expect(fn.value(key)).toBe(result);
      expect(fn.settled(key)).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
    },
  );

  test.each([false, true])(
    "supports primitive caching %s",
    async (cachePrimitives) => {
      const callback = vi.fn(async (_key: unknown) => 1);
      const fn = cachedAsync(callback, {
        cachePrimitives,
      });

      for (const key of [undefined, null, false, 0, NaN, "", 1n, Symbol()]) {
        const promise = fn(key);

        expect(fn.has(key)).toBe(cachePrimitives);
        expect(fn.pending(key)).toBe(cachePrimitives);
        expect(fn(key) === promise).toBe(cachePrimitives);

        await promise;

        expect(fn.value(key)).toBe(cachePrimitives ? 1 : undefined);
        expect(fn.settled(key)).toBe(cachePrimitives);
        expect(fn.delete(key)).toBe(cachePrimitives);
      }
    },
  );

  test("resolves keys once per call and preserves optional and rest arguments", async () => {
    const callback = vi.fn(
      async (id: number, count: number = 1, ...suffixes: string[]) => {
        return `${id}:${count}${suffixes.join("")}`;
      },
    );
    const resolveKey = vi.fn((id: number) => String(id));
    const fn = cachedAsync(callback, resolveKey);

    expect(fn.keyFor(1)).toBe("1");
    expect(callback).not.toHaveBeenCalled();

    const promise = fn(1, 2, "a", "b");

    expect(fn(1)).toBe(promise);
    expect(resolveKey).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledExactlyOnceWith(1, 2, "a", "b");
    expect(await promise).toBe("1:2ab");
    expect(fn.value("1")).toBe("1:2ab");
    expectTypeOf(fn).parameters.toEqualTypeOf<
      [id: number, count?: number, ...suffixes: string[]]
    >();
    expectTypeOf(fn.keyFor).returns.toEqualTypeOf<string>();
    expectTypeOf(fn.has).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(fn.pending).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(fn.settled).parameter(0).toEqualTypeOf<string>();
  });

  test.each([false, true])(
    "options key resolvers respect primitive caching %s",
    async (cachePrimitives) => {
      const fn = cachedAsync(async (id: number) => id, {
        resolveKey: String,
        cachePrimitives,
      });

      await fn(1);

      expect(fn.settled("1")).toBe(cachePrimitives);
    },
  );

  test("undefined resolved keys bypass caching", async () => {
    const fn = cachedAsync(
      async (_id: number) => 1,
      () => undefined,
    );
    const first = fn(1);
    const second = fn(1);

    expect(first).not.toBe(second);
    expect(await first).toBe(1);
    expect(await second).toBe(1);
    expect(fn.has(undefined)).toBe(false);
    expect(fn.pending(undefined)).toBe(false);
    expect(fn.settled(undefined)).toBe(false);
  });

  test("propagates shared rejections, removes failed entries, and retries", async () => {
    const work = defer<number>();
    const error = new Error("failed");
    const callback = vi.fn((_key: object): Promise<number> => work);
    const fn = cachedAsync(callback);
    const key = {};
    const promise = fn(key);

    expect(fn(key)).toBe(promise);

    const rejection = expect(promise).rejects.toBe(error);

    work.reject(error);

    await rejection;

    expect(fn.has(key)).toBe(false);
    expect(fn.pending(key)).toBe(false);
    expect(fn.settled(key)).toBe(false);
    expect(fn.value(key)).toBeUndefined();

    callback.mockReturnValue(Promise.resolve(2));

    expect(await fn(key)).toBe(2);
    expect(fn(key)).toBe(2);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test.each(["delete", "clear"] as const)(
    "%s prevents stale settlement from changing replacement entries",
    async (operation) => {
      const key = {};
      const work = defer<number>();
      const replacement = defer<number>();
      const callback = vi.fn((_key: object): Promise<number> => work);
      const fn = cachedAsync(callback);
      const first = fn(key);
      const rejection = expect(first).rejects.toThrow("old failure");

      if (operation === "delete") {
        expect(fn.delete(key)).toBe(true);
      } else {
        fn.clear();
      }

      callback.mockReturnValue(replacement);

      const second = fn(key);

      work.reject(new Error("old failure"));

      await rejection;

      expect(fn(key)).toBe(second);
      expect(fn.pending(key)).toBe(true);

      replacement.resolve(2);

      await second;

      expect(fn.value(key)).toBe(2);

      fn.clear();

      expect(fn.has(key)).toBe(false);
    },
  );

  test("promise returns the promise for a key without computing a missing entry", async () => {
    const callback = vi.fn(async (value: number) => {
      return await after(() => value * 2, 10);
    });

    const fn = cachedAsync(callback);

    expect(fn.promise(2)).toBeUndefined();
    expect(fn.value(2)).toBeUndefined();

    const result = fn(2);

    expect(fn.promise(2)).toBe(result);
    expect(fn.promise(2)).toBe(fn(2));
    expect(fn.value(2)).toBeUndefined();

    const tsbefore = performance.now();

    await fn(2);

    const tsafter = performance.now();

    expect(tsafter - tsbefore).toBeGreaterThanOrEqual(9);

    expect(fn(2)).toBe(4);
    expect(fn.value(2)).toBe(4);
    expect(fn.promise(2)).toBe(result);
  });

  test("deleted fulfilled work does not restore its cache entry", async () => {
    const work = defer<number>();
    const fn = cachedAsync((_key: object) => work);
    const key = {};
    const promise = fn(key);

    fn.clear();
    work.resolve(1);

    expect(await promise).toBe(1);
    expect(fn.has(key)).toBe(false);
    expect(fn.settled(key)).toBe(false);
  });

  test("propagates synchronous errors without caching", () => {
    const error = new Error("sync failure");
    const callback = vi.fn((_key: object) => {
      throw error;
    });
    const fn = cachedAsync(callback);
    const key = {};

    expect(() => fn(key)).toThrow(error);
    expect(() => fn(key)).toThrow(error);
    expect(fn.has(key)).toBe(false);
    expect(callback).toHaveBeenCalledTimes(2);

    const keyed = cachedAsync(callback, () => {
      throw error;
    });

    expect(() => keyed(key)).toThrow(error);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("retains callable holders and ignores caller receivers", async () => {
    const callback = {
      factor: 2,
      async [callable](id: number) {
        return this.factor * id;
      },
    };
    const resolver = {
      prefix: "key:",
      [callable](id: number) {
        return this.prefix + id;
      },
    };
    const fn = cachedAsync(callback, resolver);

    callback[callable] = async () => {
      throw new Error("retained method expected");
    };

    expect(await Reflect.apply(fn, {}, [2])).toBe(4);
    expect(fn(2)).toBe(4);
    expect(fn.value("key:2")).toBe(4);
    expectTypeOf(fn).thisParameter.toEqualTypeOf<void>();
    expectTypeOf(fn.call).parameter(0).toEqualTypeOf<void>();
  });

  test("supports nullary and synchronous resolvers", async () => {
    const nullary = cachedAsync(async () => ({ value: 1 }));
    const sync = cachedAsync((_key: object) => 2 as const);
    const key = {};

    expect(nullary()).toBe(nullary());
    expect((await nullary()).value).toBe(1);
    expect(await nullary()).toBe(await nullary());
    expect(await sync(key)).toBe(2);
    expect(sync(key)).toBe(2);
    expectTypeOf(nullary.has).parameter(0).toEqualTypeOf<undefined>();
    expectTypeOf(sync).returns.toEqualTypeOf<2 | Promise<2>>();
  });
});
