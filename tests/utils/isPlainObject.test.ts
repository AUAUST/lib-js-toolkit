import { runInNewContext } from "node:vm";

import { describe, expect, expectTypeOf, test } from "vitest";

import * as toolkit from "@auaust/toolkit";
import { isPlainObject } from "@auaust/toolkit";

import {
  createFunctions,
  createInstances,
  primitiveValues,
} from "../fixtures/values";

describe("isPlainObject", () => {
  test.for([
    {},
    {
      property: "value",
    },
    new Object(),
    Object.create(Object.prototype),
    Object.create(null),
    Object.freeze({}),
    Object.seal({}),
    Object.preventExtensions({}),
    new Proxy({}, {}),
    new Proxy(Object.create(null), {}),
    ...["({ value: 1 })", "new Object()", "Object.create(null)"].map(
      (source) => {
        return runInNewContext(source);
      },
    ),
  ])("accepts ordinary object %s", (input) => {
    expect(isPlainObject(input)).toBe(true);
  });

  test.for([
    ...primitiveValues,
    ...createFunctions(),
    ...createInstances(),
    [],
    Object.create({
      inherited: true,
    }),
    (function* () {
      yield 1;
    })(),
    (async function* () {
      yield 1;
    })(),
    [1, 2][Symbol.iterator](),
    new Map()[Symbol.iterator](),
    JSON,
    Atomics,
    Math,
    Reflect,
    Intl,
    WebAssembly,
    toolkit,
  ])("rejects exotic value %s", (input) => {
    expect(isPlainObject(input)).toBe(false);
  });

  test("inspects shape without reading ordinary properties", () => {
    let reads = 0;

    const input: unknown = Object.defineProperty({}, "property", {
      enumerable: true,
      get() {
        reads += 1;

        return "value";
      },
    });

    expect(isPlainObject(input)).toBe(true);
    expect(reads).toBe(0);

    if (!isPlainObject(input)) {
      return;
    }

    expectTypeOf(input).toEqualTypeOf<Record<string, unknown>>();
    expect(input.property).toBe("value");
  });
});
