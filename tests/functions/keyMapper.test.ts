import { keyMapper } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("keyMapper()", () => {
  test("keeps keys by default", () => {
    const mapper = keyMapper();

    expect(mapper("key", 42)).toBe(true);
  });

  test("maps own entries and keeps missing or inherited entries", () => {
    const inherited = { inherited: "renamed" };
    const map = Object.assign(Object.create(inherited), {
      renamed: "result" as const,
      removed: false as const,
    }) as {
      renamed: "result";
      removed: false;
      inherited: "renamed";
    };
    const mapper = keyMapper(map);

    expect(mapper("renamed", null)).toBe("result");
    expect(mapper("removed", null)).toBe(false);
    expect(mapper("inherited", null)).toBe(true);
    expect(mapper("missing" as keyof typeof map, null)).toBe(true);
  });

  test("preserves function mapper types and their value argument", () => {
    const input = (key: "value", value: number) =>
      value > 0 ? (`${key}-positive` as const) : false;
    const mapper = keyMapper(input);

    expect(mapper("value", 1)).toBe("value-positive");
    expectTypeOf(mapper).toEqualTypeOf<typeof input>();
  });

  test("normalizes numeric property keys from maps and functions", () => {
    const fromMap = keyMapper({ value: 1 as const });
    const fromFunction = keyMapper(
      (_key: PropertyKey, _value: unknown) => 2 as const,
    );

    expect(fromMap("value", null)).toBe("1");
    expect(fromFunction("value", null)).toBe("2");
    expectTypeOf(fromMap("value", null)).toEqualTypeOf<
      "1" | boolean | null | undefined
    >();
    expectTypeOf(fromFunction("value", null)).toEqualTypeOf<"2">();
  });
});
