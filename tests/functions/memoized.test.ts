import { memoized } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, test } from "vitest";

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

  test("preserves this and caches by key", () => {
    const fn = memoized(function (this: { multiplier: number }, key: number) {
      return key * this.multiplier;
    });
    const context = { multiplier: 2, fn };

    expect(context.fn(3)).toBe(6);
    context.multiplier = 4;
    expect(context.fn(3)).toBe(6);
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

    expect(fn.call({ value: 2 }, 4)).toBe(8);

    // TODO: ↓ ↓ ↓
    // The has been cached by the above call so the
    // new context does not affect the cached value.
    // This is a rather unintuitive behavior and prone
    // to errors. This should be taken into consideration
    // at some point; maybe only eager `this` binding
    // should be considered at `memoized`-call time.
    expect(fn(4)).toBe(8);
  });
});
