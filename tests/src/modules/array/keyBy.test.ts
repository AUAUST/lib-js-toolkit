import { describe, expect, expectTypeOf, test } from "vitest";

import { keyBy } from "@auaust/toolkit/array";
import { proto } from "@auaust/toolkit/object";

describe("keyBy", () => {
  test("creates own keys on a null-prototype record", () => {
    const items = [{ id: 1 }];
    const result = keyBy(items, () => "__proto__");

    expect(proto(result)).toBeNull();
    expect(Object.hasOwn(result, "__proto__")).toBe(true);

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<"__proto__", { id: number }>>
    >();
  });

  test("keys readonly arrays by property name and passes nullish through", () => {
    const result = keyBy([{ id: "a" }] as const, "id");

    expect(result).toEqual({
      a: { id: "a" },
    });

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<"a", { readonly id: "a" }>>
    >();

    expect(keyBy(null, "id" as never)).toBeUndefined();
  });
});
