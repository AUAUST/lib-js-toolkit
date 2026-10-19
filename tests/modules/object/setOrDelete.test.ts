import { setOrDelete } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("setOrDelete() models setting and deletion on the returned object", () => {
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

  const conditional = setOrDelete({}, "value", 1 as number | undefined);

  expectTypeOf(conditional).toEqualTypeOf<{} | { value: number }>();
  expect(setOrDelete({}, "value", false)).toEqual({
    value: false,
  });
});
