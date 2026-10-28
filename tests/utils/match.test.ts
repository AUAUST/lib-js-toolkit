import { describe, expect, expectTypeOf, test } from "vitest";

import { match } from "@auaust/toolkit";
import { isArray } from "@auaust/toolkit/isArray";
import { isNumber } from "@auaust/toolkit/isNumber";
import { isString } from "@auaust/toolkit/isString";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("match", () => {
  test.each([
    [1, "one"],
    ["number two", "two"],
    [Symbol.for("three"), "three"],
    [true, "four"],
    [undefined, "five"],
    [null, "six"],
    [NaN, "seven"],
  ] as const)("matches exact value %s", (input, expected) => {
    expect(match(input, [[input, expected]])).toBe(expected);
  });

  test.each([
    [2, [[1, 2, 3], "small number"]],
    [5, [[4, 5, 6], "medium number"]],
    [8, [[7, 8, 9], "large number"]],
    ["hello", [isString, "a string"]],
    [
      42,
      [
        (value: unknown) => {
          return isNumber(value) && value > 10;
        },
        "a big number",
      ],
    ],
    [
      [1, 2, 3],
      [isArray, "an array"],
    ],
    ["hello there", [/^hello/, "greeting"]],
    ["goodbye world!", [/world!$/, "farewell"]],
    ["12345", [/^\d+$/, "number string"]],
  ] as const)("matches predicate for %s", (input, [predicate, expected]) => {
    expect(match(input, [[predicate, expected]])).toBe(expected);
  });

  test.each([3, "hello"])("uses fallbacks for unmatched %s", (input) => {
    const cases = [
      [1, "one"],
      [2, "two"],
    ] as const;

    expect(match(input, cases)).toBeUndefined();
    expect(match(input, cases, "unknown")).toBe("unknown");
    expect(match(input, cases, () => "unknown")).toBe("unknown");
  });

  test.each([
    [1, "one"],
    ["hello", "greeting"],
    ["world", "farewell"],
  ] as const)("invokes matching result callbacks for %s", (input, expected) => {
    const result = match(input, [
      [1, (): "one" => "one"],
      ["hello", (): "greeting" => "greeting"],
      [/world/, (): "farewell" => "farewell"],
    ]);

    expect(result).toBe(expected);

    expectTypeOf(result).toEqualTypeOf<
      "one" | "greeting" | "farewell" | undefined
    >();
  });

  test("first matching case is returned", () => {
    const cases = [
      [[1, 2, 3], "small number"],
      [(x: unknown) => isNumber(x), "any number"],
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
      ]),
    ).toBe("matched");

    expect(
      match([
        [[() => false, () => false], "never"],
        [() => false, () => NaN],
        [[() => false, () => true], () => "matched"],
      ]),
    ).toBe("matched");

    match([
      [
        // @ts-expect-error A targetless predicate has no contextual input type.
        (x) => {
          return void expect(x).toBeUndefined();
        },
        0,
      ],
    ]);
  });

  test("supports fallbacks without target value", () => {
    expect(
      match(
        [
          [() => false, "never"],
          [() => false, "also never"],
        ],
        "fallback",
      ),
    ).toBe("fallback");

    expect(
      match(
        [
          [() => false, "never"],
          [[() => false, () => false], "also never"],
        ],
        () => ["fallback"],
      ),
    ).toEqual(["fallback"]);
  });

  test("invokes callable predicates, results, and fallbacks", () => {
    const predicate = {
      expected: 4,
      [callable](value: number) {
        return value === this.expected;
      },
    };

    const result = {
      [callable]() {
        return "matched" as const;
      },
    };

    const fallback = {
      [callable]() {
        return "fallback" as const;
      },
    };

    const matched = match(4, [[[predicate], result]], fallback);

    expectTypeOf(matched).toEqualTypeOf<"matched" | "fallback">();
    expect(matched).toBe("matched");
    expect(match(5, [[predicate, result]], fallback)).toBe("fallback");

    expect(
      match([
        [
          {
            [callable](value: undefined) {
              return value === undefined;
            },
          },
          result,
        ],
      ]),
    ).toBe("matched");
  });
});
