import { describe, expect, expectTypeOf, test } from "vitest";

import { flatten } from "@auaust/toolkit/object";

describe("flatten", () => {
  test("joins nested plain object paths with a separator", () => {
    const date = new Date(0);

    const target = {
      a: {
        b: 1,
        c: {
          d: "deep",
        },
      },
      date,
      list: [1],
    };

    const dotted = flatten(target);

    expectTypeOf(dotted).toEqualTypeOf<{
      "a.b": number;
      "a.c.d": string;
      "date": Date;
      "list": number[];
    }>();

    expect(dotted).toEqual({
      "a.b": 1,
      "a.c.d": "deep",
      date,
      "list": [1],
    });

    expect(dotted.date).toBe(date);
    expectTypeOf(
      flatten(
        {
          a: { b: 1 },
        },
        "/",
      ),
    ).toEqualTypeOf<{ "a/b": 1 }>();
    expect(flatten({})).toEqual({});
  });

  test("builds keys with a keyer, skipping undefined keys", () => {
    const result = flatten(
      {
        a: {
          b: 1,
          skipped: 2,
        },
      },
      (path) => {
        return path.includes("skipped") ? undefined : path.join("_");
      },
    );

    expectTypeOf(result).toEqualTypeOf<Partial<Record<string, unknown>>>();

    expect(result).toEqual({
      a_b: 1,
    });
  });

  test("throws when the keyer returns an invalid key", () => {
    expect(() => {
      return flatten(
        {
          a: 1,
        },
        // @ts-expect-error The keyer must return a property key.
        () => {
          return {};
        },
      );
    }).toThrow(TypeError);
  });
});
