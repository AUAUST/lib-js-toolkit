import { describe, expect, expectTypeOf, test } from "vitest";

import { hasKeys } from "@auaust/toolkit/object";

describe("hasKeys", () => {
  test("narrows when every key is an own property", () => {
    const target: unknown = {
      first: 1,
      [Symbol.iterator]: undefined,
    };

    if (hasKeys(target, "first", Symbol.iterator)) {
      expectTypeOf(target.first).toBeUnknown();
      expect(target.first).toBe(1);
    } else {
      throw new Error("Expected every own key to be present");
    }

    expect(hasKeys(target)).toBe(true);
  });

  test("rejects missing and inherited keys", () => {
    const target = {
      first: 1,
    };

    expect(hasKeys(target, "first", "second")).toBe(false);
    expect(hasKeys(target, "toString")).toBe(false);

    expect(() => {
      return hasKeys(null, "first");
    }).toThrow(TypeError);
  });
});
