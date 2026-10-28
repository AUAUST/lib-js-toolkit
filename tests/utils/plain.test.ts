import { describe, expect, expectTypeOf, test } from "vitest";

import { plain } from "@auaust/toolkit";
import { assign } from "@auaust/toolkit/object";

import { createObjects, primitiveValues } from "../fixtures/values";

describe("plain", () => {
  test("creates a fresh null-prototype object", () => {
    const result = plain();

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result).toEqual({});
    expect(plain()).not.toBe(result);
    expectTypeOf(result).toEqualTypeOf<{}>();
  });

  test.for(primitiveValues)("ignores primitive input %s", (input) => {
    const result = plain(input);

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result).toEqual({});
    expectTypeOf(result).toEqualTypeOf<{}>();
  });

  test("infers object properties without making them optional", () => {
    const input = {
      name: "example",
      count: 1,
    };

    expectTypeOf(plain(input)).toEqualTypeOf<typeof input>();

    const partial: Partial<typeof input> = {};

    expectTypeOf(plain(partial)).toEqualTypeOf<typeof partial>();
  });

  test("asserts an object type with omitted or partial input", () => {
    interface Entry {
      name: string;
      count: number;
    }

    const partial: Partial<Entry> = {
      name: "example",
    };

    expectTypeOf(plain<Entry>()).toEqualTypeOf<Entry>();
    expectTypeOf(plain<Entry>(undefined)).toEqualTypeOf<Entry>();
    expectTypeOf(plain<Entry>({})).toEqualTypeOf<Entry>();
    expectTypeOf(plain<Entry>(partial)).toEqualTypeOf<Entry>();

    expectTypeOf(
      plain<Entry>({
        name: "example",
        count: 1,
      }),
    ).toEqualTypeOf<Entry>();

    expect(plain<Entry>()).toEqual({});
    expect(plain<Entry>(partial)).toEqual(partial);

    const invalidCount = {
      count: "one",
    };

    const unrelated = {
      unrelated: true,
    };

    // @ts-expect-error The supplied property must match the asserted type.
    plain<Entry>(invalidCount);

    // @ts-expect-error Unrelated objects must be rejected, including variables.
    plain<Entry>(unrelated);

    // @ts-expect-error Primitive input cannot populate an asserted object type.
    plain<Entry>(1);

    // @ts-expect-error Null input cannot populate an asserted object type.
    plain<Entry>(null);

    // @ts-expect-error The asserted result must be an object type.
    plain<string>();
  });

  test.for(createObjects())(
    "copies own enumerable properties from %s",
    (input) => {
      const result = plain(input);

      expect(Object.getPrototypeOf(result)).toBeNull();

      expect(result).not.toBe(input);

      expect(assign({}, result)).toEqual(assign({}, input));

      expectTypeOf(result).toEqualTypeOf<typeof input>();
    },
  );
});
