import { describe, expect, expectTypeOf, test } from "vitest";

import { defineGetters } from "@auaust/toolkit/object";

describe("defineGetters", () => {
  test("infers each getter and preserves its receiver", () => {
    const target = {
      count: 2,
      label: 0,
    };

    const result = defineGetters(target, {
      doubled() {
        expectTypeOf(this).toEqualTypeOf<typeof target>();

        return this.count * 2;
      },
      label() {
        return "computed" as const;
      },
    });

    expectTypeOf(result.doubled).toEqualTypeOf<number>();
    expectTypeOf(result.label).toEqualTypeOf<"computed">();
    expectTypeOf(result.count).toEqualTypeOf<number>();
    expect(result).toBe(target);
    expect(result.doubled).toBe(4);
    expect(result.label).toBe("computed");

    if (false) {
      // @ts-expect-error Getters without setters are readonly.
      result.doubled = 4;
    }
  });

  test("includes inherited enumerable keys and ignores symbols", () => {
    const key = Symbol("ignored");

    const inherited = {
      inherited: () => 1,
    };

    const getters = Object.assign(Object.create(inherited), {
      own: () => 2,
      [key]: () => 3,
    });

    const result = defineGetters({}, getters);

    expect(result.inherited).toBe(1);
    expect(result.own).toBe(2);
    expect(Object.hasOwn(result, key)).toBe(false);
  });
});
