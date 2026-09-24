import { plain } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("plain()", () => {
  test("returns a null-prototype object", () => {
    const result = plain();

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result).toEqual({});
  });

  test("returns a new object each time", () => {
    const result1 = plain();
    const result2 = plain();

    expect(result1).not.toBe(result2);
  });

  test("assigns the properties correctly", () => {
    const result = plain({
      a: 1,
      b: 2,
    });

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
