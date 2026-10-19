import { empty, filled, type FilledValue } from "@auaust/toolkit";
import { countOf, type Countable } from "@auaust/toolkit/protocols/countable";
import { isEmpty, type Emptiable } from "@auaust/toolkit/protocols/emptiable";
import type {
  FilledContainer,
  FilledMember,
  FilledString,
} from "@auaust/toolkit/types";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("filled()", () => {
  test("returns false for empty values", () => {
    expect(filled("")).toBe(false);
    expect(filled(" \t\n\u00a0\ufeff")).toBe(false);
    expect(filled([])).toBe(false);
    expect(filled({})).toBe(false);
    expect(filled(null)).toBe(false);
    expect(filled(undefined)).toBe(false);
    expect(filled(new Map())).toBe(false);
    expect(filled(new Set())).toBe(false);
  });

  test("returns true for filled values", () => {
    expect(filled("non-filled")).toBe(true);
    expect(filled([1, 2, 3])).toBe(true);
    expect(filled({ key: "value" })).toBe(true);
    expect(filled(42)).toBe(true);
    expect(filled(0)).toBe(true);
    expect(filled(NaN)).toBe(true);
    expect(filled(new Map([["key", "value"]]))).toBe(true);
    expect(filled(new Set([1, 2, 3]))).toBe(true);
  });

  test("extracts filled members from mixed literal unions", () => {
    function check(
      input: "" | " " | "\t\n" | "hello" | 0 | 1 | null | undefined,
    ) {
      if (filled(input)) {
        expectTypeOf(input).toEqualTypeOf<"hello" | 0 | 1>();
      } else {
        expectTypeOf(input).toEqualTypeOf<
          "" | " " | "\t\n" | null | undefined
        >();
      }
    }

    check("");
    check(" ");
    check("\t\n");
    check("hello");
    check(0);
    check(null);
    check(undefined);

    expectTypeOf<
      FilledString<"" | " " | " hello ">
    >().toEqualTypeOf<" hello ">();
    expectTypeOf<FilledString<"\u00a0\ufeff">>().toBeNever();
    expectTypeOf<FilledString<"\u200b">>().toEqualTypeOf<"\u200b">();
    expectTypeOf<FilledString<` ${string}`>>().toEqualTypeOf<` ${string}`>();
    expectTypeOf<FilledString>().toEqualTypeOf<string>();
  });

  test("preserves primitives and narrows unknown values to non-nullish values", () => {
    expectTypeOf<FilledValue<number>>().toEqualTypeOf<number>();
    expectTypeOf<FilledValue<0 | 1 | 2>>().toEqualTypeOf<0 | 1 | 2>();
    expectTypeOf<FilledValue<boolean | bigint | symbol>>().toEqualTypeOf<
      boolean | bigint | symbol
    >();
    expectTypeOf<FilledValue<never>>().toBeNever();
    expectTypeOf<FilledValue<any>>().toBeAny();
    expectTypeOf<FilledValue<unknown>>().toEqualTypeOf<
      string | number | bigint | boolean | symbol | object
    >();
    expectTypeOf<FilledValue<{}>>().toEqualTypeOf<{}>();

    function check(input: unknown) {
      if (filled(input)) {
        expectTypeOf(input).toEqualTypeOf<
          string | number | bigint | boolean | symbol | object
        >();
      } else {
        expectTypeOf(input).toBeUnknown();
      }
    }

    check(0);
    check(null);
  });

  test("narrows arrays to nonempty tuples while preserving their properties", () => {
    function check(input: string[] & { label: string }) {
      if (filled(input)) {
        expectTypeOf(input).toEqualTypeOf<
          string[] & { label: string } & [string, ...string[]]
        >();
      }
    }

    check(
      Object.assign(["value"], {
        label: "values",
      }),
    );

    expectTypeOf<FilledValue<readonly number[]>>().toEqualTypeOf<
      readonly number[] & readonly [number, ...number[]]
    >();
    expectTypeOf<FilledContainer<string[]>>().toEqualTypeOf<
      [string, ...string[]]
    >();
    expectTypeOf<FilledValue<[number?]>>().toEqualTypeOf<
      [number?] & [number | undefined, ...(number | undefined)[]]
    >();
  });

  test("excludes empty tuples without changing nonempty tuple contracts", () => {
    function check(input: [] | [number] | readonly [] | readonly [string]) {
      if (filled(input)) {
        expectTypeOf(input).toEqualTypeOf<[number] | readonly [string]>();
      } else {
        expectTypeOf(input).toEqualTypeOf<[] | readonly []>();
      }
    }

    check([]);
    check([1]);
    check(["value"]);
  });

  test("preserves collection element types and excludes known empty counts", () => {
    expectTypeOf<
      FilledValue<Map<string, number> | Set<number>>
    >().toEqualTypeOf<Map<string, number> | Set<number>>();
    expectTypeOf<FilledValue<ReadonlyMap<string, number>>>().toEqualTypeOf<
      ReadonlyMap<string, number>
    >();
    expectTypeOf<FilledValue<ReadonlySet<number>>>().toEqualTypeOf<
      ReadonlySet<number>
    >();
    expectTypeOf<
      FilledValue<Map<string, never> | ReadonlySet<never>>
    >().toBeNever();
    expectTypeOf<FilledValue<{ length: 0 } | { size: 0 }>>().toBeNever();
    expectTypeOf<FilledValue<{ length: 1; size: 0 }>>().toEqualTypeOf<{
      length: 1;
      size: 0;
    }>();
    expectTypeOf<FilledValue<() => void>>().toEqualTypeOf<() => void>();
  });

  test("narrows emptiness protocols before considering container shape", () => {
    function check(input: Emptiable & { label: string }) {
      if (filled(input)) {
        expectTypeOf(input).toEqualTypeOf<
          Emptiable & { label: string } & Emptiable<false>
        >();
      }
    }

    const value = {
      label: "custom",
      [isEmpty]() {
        return this.label === "";
      },
    };

    check(value);
    expect(filled(value)).toBe(true);

    value.label = "";

    expect(filled(value)).toBe(false);
    expectTypeOf<FilledValue<Emptiable<true>>>().toBeNever();
    expectTypeOf<FilledValue<Emptiable<false>>>().toEqualTypeOf<
      Emptiable<false>
    >();
    expectTypeOf<FilledValue<Emptiable & []>>().toEqualTypeOf<
      Emptiable & [] & Emptiable<false>
    >();
    expectTypeOf<FilledMember<Emptiable>>().toEqualTypeOf<Emptiable<false>>();
  });

  test("respects count protocols and emptiness protocol precedence", () => {
    const counted = {
      length: 0 as const,
      [countOf]() {
        return 1;
      },
    };

    expect(filled(counted)).toBe(true);
    expectTypeOf<FilledValue<typeof counted>>().toEqualTypeOf<typeof counted>();
    expectTypeOf<FilledValue<Countable>>().toEqualTypeOf<Countable>();
    expectTypeOf<FilledValue<{ [countOf](): 0 }>>().toBeNever();
    expectTypeOf<
      FilledValue<Emptiable<false> & { [countOf](): 0 }>
    >().toEqualTypeOf<Emptiable<false> & { [countOf](): 0 }>();

    const customEmpty = {
      ...counted,
      [isEmpty]: true as const,
    };

    expect(filled(customEmpty)).toBe(false);
    expectTypeOf<FilledValue<typeof customEmpty>>().toBeNever();
  });

  test("infers filled element types when filtering", () => {
    const values: ("" | " " | "value" | null | 0)[] = [
      "",
      " ",
      "value",
      null,
      0,
    ];
    const result = values.filter(filled);

    expect(result).toEqual(["value", 0]);
    expectTypeOf(result).toEqualTypeOf<("value" | 0)[]>();
  });

  test("remains the inverse of empty for representative values", () => {
    const values = [
      "",
      " ",
      "value",
      [],
      [undefined],
      {},
      null,
      undefined,
      0,
      NaN,
      false,
      0n,
      Symbol(),
      new Date(),
      () => {},
      new Map(),
      new Set([0]),
    ];

    for (const input of values) {
      expect(filled(input)).toBe(!empty(input));
    }
  });
});
