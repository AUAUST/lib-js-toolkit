import { describe, expect, expectTypeOf, test } from "vitest";

import { empty, type EmptyValueOf } from "@auaust/toolkit";
import { countOf, type Countable } from "@auaust/toolkit/protocols/countable";
import { isEmpty, type Emptiable } from "@auaust/toolkit/protocols/emptiable";

import { createEmptyValues, createFilledValues } from "../fixtures/values";

describe("empty", () => {
  test.for(createEmptyValues())("recognizes empty value %s", (input) => {
    expect(empty(input)).toBe(true);
  });

  test.for(createFilledValues())("recognizes filled value %s", (input) => {
    expect(empty(input)).toBe(false);
  });

  test("supports the `Emptiable` protocol", () => {
    const value: any = {
      value: 1,
    };

    expect(empty(value)).toBe(false);

    value[isEmpty] = function (this: any) {
      return this.value === 0;
    };

    expect(empty(value)).toBe(false);

    value.value = 0;

    expect(empty(value)).toBe(true);
  });

  test("narrows strings using only their possible blank values", () => {
    function check(input: "" | " " | "\t\n" | "hello" | " hello ") {
      if (empty(input)) {
        expectTypeOf(input).toEqualTypeOf<"" | " " | "\t\n">();
      } else {
        expectTypeOf(input).toEqualTypeOf<"hello" | " hello ">();
      }
    }

    check("");

    check(" ");

    check("\t\n");

    check("hello");

    check(" hello ");

    function checkBroad(input: string) {
      if (empty(input)) {
        expectTypeOf(input).toMatchTypeOf<string>();
      } else {
        expectTypeOf(input).toEqualTypeOf<string>();
      }
    }

    checkBroad("value");

    function checkTemplate(input: ` ${string}`) {
      if (empty(input)) {
        expectTypeOf(input).toMatchTypeOf<` ${string}`>();
      } else {
        expectTypeOf(input).toEqualTypeOf<` ${string}`>();
      }
    }

    checkTemplate(" ");

    checkTemplate(" hello");

    expectTypeOf<
      EmptyValueOf<"\u00a0\ufeff">
    >().toEqualTypeOf<"\u00a0\ufeff">();
    expectTypeOf<EmptyValueOf<"\u200b">>().toBeNever();
  });

  test("excludes primitives that cannot be empty from mixed unions", () => {
    function check(input: "" | "hello" | 0 | 1 | 2 | null | undefined) {
      if (empty(input)) {
        expectTypeOf(input).toEqualTypeOf<"" | null | undefined>();
      } else {
        expectTypeOf(input).toEqualTypeOf<"hello" | 0 | 1 | 2>();
      }
    }

    check("");

    check("hello");

    check(0);

    check(null);

    check(undefined);

    expectTypeOf<EmptyValueOf<number>>().toBeNever();
    expectTypeOf<EmptyValueOf<0 | 1 | 2>>().toBeNever();
    expectTypeOf<EmptyValueOf<boolean | bigint | symbol>>().toBeNever();
    expectTypeOf<EmptyValueOf<never>>().toBeNever();
    expectTypeOf<EmptyValueOf<unknown>>().not.toBeUnknown();
    expectTypeOf<EmptyValueOf<any>>().toBeAny();
  });

  test("preserves tuple mutability and excludes nonempty tuples", () => {
    function check(input: [] | [number] | readonly [] | readonly [string]) {
      if (empty(input)) {
        expectTypeOf(input).toEqualTypeOf<[] | readonly []>();
      } else {
        expectTypeOf(input).toEqualTypeOf<[number] | readonly [string]>();
      }
    }

    check([]);

    check([1]);

    check(["value"]);

    expectTypeOf<EmptyValueOf<string[]>>().toEqualTypeOf<string[] & []>();
    expectTypeOf<EmptyValueOf<readonly string[]>>().toEqualTypeOf<
      readonly string[] & readonly []
    >();
    expectTypeOf<EmptyValueOf<[number?]>>().toEqualTypeOf<[number?] & []>();
  });

  test("narrows collections without introducing unrelated types", () => {
    function check(input: Map<string, number> | Set<number>) {
      if (empty(input)) {
        expectTypeOf(input).toEqualTypeOf<
          | (Map<string, number> & Map<string, never>)
          | (Set<number> & Set<never>)
        >();
      }
    }

    check(new Map());

    check(new Set());

    expectTypeOf<EmptyValueOf<ReadonlyMap<string, number>>>().toEqualTypeOf<
      ReadonlyMap<string, number> & ReadonlyMap<string, never>
    >();
    expectTypeOf<EmptyValueOf<ReadonlySet<number>>>().toEqualTypeOf<
      ReadonlySet<number> & ReadonlySet<never>
    >();
    expectTypeOf<
      EmptyValueOf<{ length: number; label: string }>
    >().toEqualTypeOf<{ length: number; label: string } & { length: 0 }>();
    expectTypeOf<EmptyValueOf<{ size: number }>>().toEqualTypeOf<
      { size: number } & { size: 0 }
    >();
    expectTypeOf<EmptyValueOf<{ optional?: string }>>().toEqualTypeOf<
      { optional?: string } & Record<string, never>
    >();
  });

  test("preserves custom protocols and their own properties", () => {
    function check(input: Emptiable & { label: string }) {
      if (empty(input)) {
        expectTypeOf(input.label).toEqualTypeOf<string>();
        expectTypeOf(input).toEqualTypeOf<
          Emptiable & { label: string } & Emptiable<true>
        >();
      }
    }

    check({
      label: "custom",
      [isEmpty]: true,
    });

    const counted = {
      label: "custom count",
      [countOf]() {
        return 0;
      },
    };

    expect(empty(counted)).toBe(true);
    expectTypeOf<EmptyValueOf<Countable>>().toEqualTypeOf<
      Countable & { [countOf](): 0 }
    >();
    expectTypeOf<EmptyValueOf<Emptiable<false>>>().toBeNever();
    expectTypeOf<EmptyValueOf<Emptiable & [number]>>().toEqualTypeOf<
      Emptiable & [number] & Emptiable<true>
    >();

    function checkCounted(input: Countable) {
      if (empty(input)) {
        expectTypeOf(input).toMatchTypeOf<Countable>();
      } else {
        expectTypeOf(input).toEqualTypeOf<Countable>();
      }
    }

    checkCounted(counted);
  });

  test("infers the narrowed array element type when filtering", () => {
    const values: ("" | "value" | null | 42)[] = ["", "value", null, 42];
    const result = values.filter(empty);

    expect(result).toEqual(["", null]);
    expectTypeOf(result).toEqualTypeOf<("" | null)[]>();
  });
});
