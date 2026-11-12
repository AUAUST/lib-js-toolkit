import { describe, expect, expectTypeOf, test } from "vitest";

import { has } from "@auaust/toolkit/object";

describe("has", () => {
  test("checks inherited properties and narrows unknown objects", () => {
    const key = Symbol("key");

    const target: unknown = {
      [key]: undefined,
    };

    if (has(target, key)) {
      expectTypeOf(target[key]).toBeUnknown();
      expect(target[key]).toBeUndefined();
    } else {
      throw new Error("Expected the symbol property to be present");
    }

    expect(has({}, "toString")).toBe(true);
    expect(has({}, "missing")).toBe(false);
    expect(has(null, "key")).toBe(false);
    expect(has(undefined, "key")).toBe(false);
  });
});
