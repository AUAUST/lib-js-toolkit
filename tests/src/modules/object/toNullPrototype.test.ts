import { describe, expect, expectTypeOf, test } from "vitest";

import { assign, toNullPrototype } from "@auaust/toolkit/object";

import { createObjects, primitiveValues } from "#tests/fixtures/values";

describe("toNullPrototype", () => {
  test("creates a fresh null-prototype object", () => {
    const result = toNullPrototype();

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result).toEqual({});
    expect(toNullPrototype()).not.toBe(result);
    expectTypeOf(result).toEqualTypeOf<{}>();
  });

  test.for(primitiveValues)("ignores primitive input %s", (input) => {
    const result = toNullPrototype(input);

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result).toEqual({});
    expectTypeOf(result).toEqualTypeOf<{}>();
  });

  test("infers object properties without making them optional", () => {
    const input = {
      name: "example",
      count: 1,
    };

    expectTypeOf(toNullPrototype(input)).toEqualTypeOf<typeof input>();

    const partial: Partial<typeof input> = {};

    expectTypeOf(toNullPrototype(partial)).toEqualTypeOf<typeof partial>();
  });

  test("asserts an object type with omitted or partial input", () => {
    interface Entry {
      name: string;
      count: number;
    }

    const partial: Partial<Entry> = {
      name: "example",
    };

    expectTypeOf(toNullPrototype<Entry>()).toEqualTypeOf<Entry>();
    expectTypeOf(toNullPrototype<Entry>(undefined)).toEqualTypeOf<Entry>();
    expectTypeOf(toNullPrototype<Entry>({})).toEqualTypeOf<Entry>();
    expectTypeOf(toNullPrototype<Entry>(partial)).toEqualTypeOf<Entry>();

    expectTypeOf(
      toNullPrototype<Entry>({
        name: "example",
        count: 1,
      }),
    ).toEqualTypeOf<Entry>();

    expect(toNullPrototype<Entry>()).toEqual({});
    expect(toNullPrototype<Entry>(partial)).toEqual(partial);

    const invalidCount = {
      count: "one",
    };

    const unrelated = {
      unrelated: true,
    };

    // @ts-expect-error The supplied property must match the asserted type.
    toNullPrototype<Entry>(invalidCount);

    // @ts-expect-error Unrelated objects must be rejected, including variables.
    toNullPrototype<Entry>(unrelated);

    // @ts-expect-error Primitive input cannot populate an asserted object type.
    toNullPrototype<Entry>(1);

    // @ts-expect-error Null input cannot populate an asserted object type.
    toNullPrototype<Entry>(null);

    // @ts-expect-error The asserted result must be an object type.
    toNullPrototype<string>();
  });

  test.for(createObjects())(
    "copies own enumerable properties from %s",
    (input) => {
      const result = toNullPrototype(input);

      expect(Object.getPrototypeOf(result)).toBeNull();

      expect(result).not.toBe(input);

      expect(assign({}, result)).toEqual(assign({}, input));

      expectTypeOf(result).toEqualTypeOf<typeof input>();
    },
  );
});
