import { hasOwn } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("hasOwn() narrows unknown objects and excludes inherited properties", () => {
  const target: unknown = {
    value: undefined,
  };

  if (hasOwn(target, "value")) {
    expectTypeOf(target.value).toBeUnknown();

    expect(target.value).toBeUndefined();
  } else {
    throw new Error("Expected the own property to be present");
  }

  expect(hasOwn).toBe(Object.hasOwn);
  expect(hasOwn({}, "toString")).toBe(false);
  expect(() => hasOwn(null, "value")).toThrow(TypeError);
});
