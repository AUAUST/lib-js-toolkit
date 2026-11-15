import { describe, expect, test } from "vitest";

import { randomString } from "@auaust/toolkit/string";

describe("randomString", () => {
  test("draws 8 alphanumeric characters by default", () => {
    expect(randomString()).toMatch(/^[a-zA-Z0-9]{8}$/);
  });

  test("leaves out uppercase letters when uppercase is false", () => {
    expect(randomString({ uppercase: false, length: 50 })).toMatch(
      /^[a-z0-9]{50}$/,
    );
  });

  test("draws only from a given pool", () => {
    expect(randomString({ pool: "ab", length: 50 })).toMatch(/^[ab]{50}$/);
  });

  test("makes pool and uppercase exclusive", () => {
    // @ts-expect-error pool and uppercase are exclusive
    randomString({ pool: "ab", uppercase: true });
  });

  test("returns the empty string for a zero length", () => {
    expect(randomString(0)).toBe("");
  });

  test("throws a RangeError for invalid inputs", () => {
    expect(() => randomString(-1)).toThrow(RangeError);
    expect(() => randomString(1.5)).toThrow(RangeError);
    expect(() => randomString({ pool: "" })).toThrow(RangeError);
  });
});
