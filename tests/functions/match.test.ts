import { match } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("match()", () => {
  test("matches exact values", () => {
    const cases = [
      [1, "one"],
      ["number two", "two"],
      [Symbol.for("three"), "three"],
      [true, "four"],
      [undefined, "five"],
      [null, "six"],
      [NaN, "seven"],
    ] as const;

    expect(match(cases, 1)).toBe("one");
    expect(match(cases, "number two")).toBe("two");
    expect(match(cases, Symbol.for("three"))).toBe("three");
    expect(match(cases, true)).toBe("four");
    expect(match(cases, undefined)).toBe("five");
    expect(match(cases, null)).toBe("six");
    expect(match(cases, NaN)).toBe("seven");
  });

  test("handles multiple predicates", () => {
    const cases = [
      [[1, 2, 3], "small number"],
      [[4, 5, 6], "medium number"],
      [[7, 8, 9], "large number"],
    ] as const;

    expect(match(cases, 2)).toBe("small number");
    expect(match(cases, 5)).toBe("medium number");
    expect(match(cases, 8)).toBe("large number");
  });

  test("matches using functions", () => {
    const cases = [
      [(x: unknown) => typeof x === "string", "a string"],
      [(x: unknown) => typeof x === "number" && x > 10, "a big number"],
      [(x: unknown) => Array.isArray(x), "an array"],
    ] as const;

    expect(match(cases, "hello")).toBe("a string");
    expect(match(cases, 42)).toBe("a big number");
    expect(match(cases, [1, 2, 3])).toBe("an array");
  });

  test("matches using regular expressions", () => {
    const cases = [
      [/^hello/, "greeting"],
      [/world!$/, "farewell"],
      [/^\d+$/, "number string"],
    ] as const;

    expect(match(cases, "hello there")).toBe("greeting");
    expect(match(cases, "goodbye world!")).toBe("farewell");
    expect(match(cases, "12345")).toBe("number string");
  });

  test("returns fallback when no match is found", () => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(cases, 3, "unknown")).toBe("unknown");
    expect(match(cases, "hello", "no match")).toBe("no match");
  });

  test("returns undefined when no match is found and no fallback is provided", () => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(cases, 3)).toBeUndefined();
    expect(match(cases, "hello")).toBeUndefined();
  });

  test("supports callbacks as results", () => {
    const cases = [
      [1, () => "one"],
      ["hello", () => "greeting"],
      [/world/, () => "farewell"],
    ] as const;

    expect(match(cases, 1)).toBe("one");
    expect(match(cases, "hello")).toBe("greeting");
    expect(match(cases, "world")).toBe("farewell");
  });

  test("supports callbacks as fallback", () => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(cases, 3, () => "unknown")).toBe("unknown");
    expect(match(cases, "hello", () => "no match")).toBe("no match");
  });

  test("first matching case is returned", () => {
    const cases = [
      [[1, 2, 3], "small number"],
      [(x: unknown) => typeof x === "number", "any number"],
      [/^\d+$/, "number string"],
    ] as const;

    expect(match(cases, 2)).toBe("small number");
    expect(match(cases, 42)).toBe("any number");
    expect(match(cases, "12345")).toBe("number string");
  });
});
