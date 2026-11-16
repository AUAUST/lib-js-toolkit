import { describe, expect, test } from "vitest";

import { isEnumerable } from "@auaust/toolkit/object";

describe("isEnumerable", () => {
  test("accepts an own enumerable key, string or symbol", () => {
    const key = Symbol("key");

    expect(isEnumerable({ a: 1, [key]: 2 }, "a")).toBe(true);
    expect(isEnumerable({ [key]: 2 }, key)).toBe(true);
  });

  test("rejects inherited, missing and non-enumerable keys", () => {
    expect(isEnumerable({}, "toString")).toBe(false);
    expect(isEnumerable({}, "a")).toBe(false);
    expect(isEnumerable([], "length")).toBe(false);
  });
});
