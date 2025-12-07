import { cached } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

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
});
