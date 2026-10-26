import { describe, expect, expectTypeOf, test } from "vitest";

import { hasOwn } from "@auaust/toolkit/object";

describe("hasOwn", () => {
  test("narrows unknown objects and excludes inherited properties", () => {
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
    expect(() => {
      return hasOwn(null, "value");
    }).toThrow(TypeError);
  });
});
