import { describe, expect, expectTypeOf, test } from "vitest";

import { keyBy } from "@auaust/toolkit/iterable";
import { proto } from "@auaust/toolkit/object";

describe("keyBy", () => {
  test("keys values by property name, a later value replacing an earlier one", () => {
    const items = [
      { id: "a", n: 1 },
      { id: "b", n: 2 },
      { id: "a", n: 3 },
    ];

    const result = keyBy(items, "id");

    expect(result).toEqual({ a: items[2], b: items[1] });

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<string, { id: string; n: number }>>
    >();
  });

  test("creates own keys on a null-prototype record", () => {
    const items = [{ id: 1 }];
    const result = keyBy(items, () => "__proto__");

    expect(proto(result)).toBeNull();
    expect(Object.hasOwn(result, "__proto__")).toBe(true);
    expect(result.__proto__).toBe(items[0]);

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<"__proto__", { id: number }>>
    >();
  });

  test("throws on invalid arguments and passes nullish through", () => {
    expect(() => keyBy(42 as never, "id" as never)).toThrow(TypeError);
    expect(() => keyBy([{}], true as never)).toThrow(TypeError);
    expect(keyBy(null, "id" as never)).toBeUndefined();
  });
});
