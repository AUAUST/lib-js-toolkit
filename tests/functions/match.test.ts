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

    expect(match(1, cases)).toBe("one");
    expect(match("number two", cases)).toBe("two");
    expect(match(Symbol.for("three"), cases)).toBe("three");
    expect(match(true, cases)).toBe("four");
    expect(match(undefined, cases)).toBe("five");
    expect(match(null, cases)).toBe("six");
    expect(match(NaN, cases)).toBe("seven");
  });

  test("handles multiple predicates", () => {
    const cases = [
      [[1, 2, 3], "small number"],
      [[4, 5, 6], "medium number"],
      [[7, 8, 9], "large number"],
    ] as const;

    expect(match(2, cases)).toBe("small number");
    expect(match(5, cases)).toBe("medium number");
    expect(match(8, cases)).toBe("large number");
  });

  test("matches using functions", () => {
    const cases = [
      [(x: unknown) => typeof x === "string", "a string"],
      [(x: unknown) => typeof x === "number" && x > 10, "a big number"],
      [(x: unknown) => Array.isArray(x), "an array"],
    ] as const;

    expect(match("hello", cases)).toBe("a string");
    expect(match(42, cases)).toBe("a big number");
    expect(match([1, 2, 3], cases)).toBe("an array");
  });

  test("matches using regular expressions", () => {
    const cases = [
      [/^hello/, "greeting"],
      [/world!$/, "farewell"],
      [/^\d+$/, "number string"],
    ] as const;

    expect(match("hello there", cases)).toBe("greeting");
    expect(match("goodbye world!", cases)).toBe("farewell");
    expect(match("12345", cases)).toBe("number string");
  });

  test("returns fallback when no match is found", () => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(3, cases, "unknown")).toBe("unknown");
    expect(match("hello", cases, "no match")).toBe("no match");
  });

  test("returns undefined when no match is found and no fallback is provided", () => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(3, cases)).toBeUndefined();
    expect(match("hello", cases)).toBeUndefined();
  });

  test("supports callbacks as results", () => {
    const cases = [
      [1, () => "one" as const],
      ["hello", () => "greeting" as const],
      [/world/, () => "farewell" as const],
    ] as const;

    expect(match(1, cases)).toBe("one");
    expect(match("hello", cases)).toBe("greeting");
    expect(match("world", cases)).toBe("farewell");
  });

  test("supports callbacks as fallback", () => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(3, cases, () => "unknown")).toBe("unknown");
    expect(match("hello", cases, () => "no match")).toBe("no match");
  });

  test("first matching case is returned", () => {
    const cases = [
      [[1, 2, 3], "small number"],
      [(x: unknown) => typeof x === "number", "any number"],
      [/^\d+$/, "number string"],
    ] as const;

    expect(match(2, cases)).toBe("small number");
    expect(match(42, cases)).toBe("any number");
    expect(match("12345", cases)).toBe("number string");
  });

  test("handles a lack of target value", () => {
    expect(
      match([
        [() => false, () => "never"],
        [() => true, () => "matched"],
      ])
    ).toBe("matched");

    expect(
      match([
        [[() => false, () => false], "never"],
        [() => false, () => NaN],
        [[() => false, () => true], () => "matched"],
      ])
    ).toBe("matched");

    // @ts-expect-error
    match([[(x) => expect(x).toBeUndefined(), 0]]);
  });

  test("supports fallbacks without target value", () => {
    expect(
      match(
        [
          [() => false, "never"],
          [() => false, "also never"],
        ],
        "fallback"
      )
    ).toBe("fallback");

    expect(
      match(
        [
          [() => false, "never"],
          [[() => false, () => false], "also never"],
        ],
        () => ["fallback"]
      )
    ).toEqual(["fallback"]);
  });
});
