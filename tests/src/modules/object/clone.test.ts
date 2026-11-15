import { describe, expect, expectTypeOf, test } from "vitest";

import { clone } from "@auaust/toolkit/object";

describe("clone", () => {
  test("copies nested plain objects and keeps instances by reference", () => {
    const target = {
      date: new Date(0),
      nested: {
        value: 1,
      },
      list: [
        {
          value: 2,
        },
      ],
    };

    const result = clone(target);

    expectTypeOf(result).toEqualTypeOf<typeof target>();
    expect(result).toEqual(target);
    expect(result).not.toBe(target);
    expect(result.nested).not.toBe(target.nested);
    expect(result.date).toBe(target.date);
    expect(result.list).toBe(target.list);
  });

  test("copies arrays recursively with the arrays option", () => {
    const target = [
      {
        value: 1,
      },
    ];

    const result = clone(target, {
      arrays: true,
    });

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
    expect(result[0]).not.toBe(target[0]);
    expect(clone(1)).toBe(1);
  });
});
