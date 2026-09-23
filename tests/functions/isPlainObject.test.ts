import * as toolkit from "@auaust/toolkit";
import { isPlainObject } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";
import { runInNewContext } from "vm";

describe("isPlainObject()", () => {
  test("accepts ordinary objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ property: "value" })).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
    expect(isPlainObject(Object.create(Object.prototype))).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject(Object.freeze({}))).toBe(true);
    expect(isPlainObject(Object.seal({}))).toBe(true);
    expect(isPlainObject(Object.preventExtensions({}))).toBe(true);
  });

  test("accepts ordinary objects created in another realm", () => {
    expect(isPlainObject(runInNewContext("({ value: 1 })"))).toBe(true);
    expect(isPlainObject(runInNewContext("new Object()"))).toBe(true);
    expect(isPlainObject(runInNewContext("Object.create(null)"))).toBe(true);
  });

  test("accepts transparent proxies over ordinary objects", () => {
    expect(isPlainObject(new Proxy({}, {}))).toBe(true);
    expect(isPlainObject(new Proxy(Object.create(null), {}))).toBe(true);
  });

  test("does not read ordinary properties while inspecting an object", () => {
    let reads = 0;
    const value = Object.defineProperty({}, "property", {
      enumerable: true,
      get() {
        reads += 1;
        return "value";
      },
    });

    expect(isPlainObject(value)).toBe(true);
    expect(reads).toBe(0);
  });

  test("rejects primitive values and functions", () => {
    const primitives = [
      null,
      undefined,
      false,
      true,
      0,
      NaN,
      1n,
      "object",
      Symbol("object"),
    ];

    const functions = [
      function regular() {},
      async function asynchronous() {},
      function* generator() {},
      async function* asyncGenerator() {},
      () => {},
      class Example {},
    ];

    for (const value of [...primitives, ...functions]) {
      expect(isPlainObject(value)).toBe(false);
    }
  });

  test("rejects objects with custom prototypes and class instances", () => {
    class Example {}
    const customPrototype = { inherited: true };

    expect(isPlainObject(new Example())).toBe(false);
    expect(isPlainObject(Object.create(customPrototype))).toBe(false);
  });

  test("rejects standard collection and keyed-collection objects", () => {
    const values = [
      [],
      new Map(),
      new Set(),
      new WeakMap(),
      new WeakSet(),
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
      new Uint8Array(),
    ];

    for (const value of values) {
      expect(isPlainObject(value)).toBe(false);
    }
  });

  test("rejects generators, iterators, and iterable protocol objects", () => {
    function* generate() {
      yield 1;
    }

    expect(isPlainObject(generate)).toBe(false);
    expect(isPlainObject(generate())).toBe(false);

    async function* generateAsync() {
      yield 1;
    }

    expect(isPlainObject(generateAsync)).toBe(false);
    expect(isPlainObject(generateAsync())).toBe(false);

    expect(isPlainObject([1, 2][Symbol.iterator]())).toBe(false);
    expect(isPlainObject(new Map()[Symbol.iterator]())).toBe(false);
  });

  test("rejects intrinsic namespace and module namespace objects", () => {
    expect(isPlainObject(JSON)).toBe(false);
    expect(isPlainObject(Atomics)).toBe(false);
    expect(isPlainObject(Math)).toBe(false);
    expect(isPlainObject(Reflect)).toBe(false);
    expect(isPlainObject(Intl)).toBe(false);
    expect(isPlainObject(WebAssembly)).toBe(false);
    expect(isPlainObject(toolkit)).toBe(false);
  });

  test("rejects other built-in and platform objects", () => {
    const values = [
      new Date(),
      /pattern/,
      new Error("message"),
      Promise.resolve(),
      new Boolean(false),
      new Number(0),
      new String("value"),
      new URL("https://example.com"),
      new URLSearchParams(),
    ];

    for (const value of values) {
      expect(isPlainObject(value)).toBe(false);
    }
  });

  test("narrows unknown values to records", () => {
    const value: unknown = { property: "value" };

    if (isPlainObject(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<string, unknown>>();
      expect(value.property).toBe("value");
    }
  });
});
