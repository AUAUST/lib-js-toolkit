import { describe, expect, expectTypeOf, test } from "vitest";

import { setOrDelete } from "@auaust/toolkit/object";

describe("setOrDelete", () => {
  test("models setting and deletion on the returned object", () => {
    const target = {
      value: 1,
      retained: true,
    };

    const updated = setOrDelete(target, "value", null);
    const deleted = setOrDelete(updated, "value", undefined);

    expectTypeOf(updated.value).toEqualTypeOf<null>();
    expectTypeOf(deleted).toEqualTypeOf<{ retained: boolean }>();
    expect(updated).toBe(target);
    expect(deleted).toBe(target);
    expect(Object.hasOwn(deleted, "value")).toBe(false);

    const conditional = setOrDelete({}, "value", 1);

    expectTypeOf(conditional).toEqualTypeOf<{} | { value: number }>();

    expect(setOrDelete({}, "value", false)).toEqual({
      value: false,
    });
  });
});
