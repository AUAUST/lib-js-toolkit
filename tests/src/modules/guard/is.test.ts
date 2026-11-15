import { describe, expect, expectTypeOf, test } from "vitest";

import {
  is,
  isArray,
  isContainer,
  isNullish,
  isNumeric,
  isObject,
  isPrimitive,
  isScalar,
} from "@auaust/toolkit/guard";

import { createTypeLeafValues, createValues } from "#tests/fixtures/values";

describe("is", () => {
  test("matches any of the given type names", () => {
    expect(is("a", "number", "string")).toBe(true);
    expect(is(() => {}, "object")).toBe(false);
    expect(is(() => {}, "container")).toBe(true);
    expect(is(null, "object")).toBe(false);
    expect(is([], "array")).toBe(true);
    expect(is([], "object")).toBe(true);
    expect(is({}, "array")).toBe(false);
    expect(is(1n, "numeric")).toBe(true);
    expect(is(Symbol("value"), "scalar")).toBe(false);
    expect(is("a")).toBe(false);
  });

  test.for(createValues())("matches case %# (%s) as unknown", (value) => {
    expect(is(value, "unknown")).toBe(true);
  });

  test.for(createTypeLeafValues())(
    "agrees with the group guards on case %# (%s)",
    (value) => {
      expect(is(value, "primitive")).toBe(isPrimitive(value));
      expect(is(value, "nullish")).toBe(isNullish(value));
      expect(is(value, "scalar")).toBe(isScalar(value));
      expect(is(value, "numeric")).toBe(isNumeric(value));
      expect(is(value, "container")).toBe(isContainer(value));
      expect(is(value, "object")).toBe(isObject(value));
      expect(is(value, "array")).toBe(isArray(value));
    },
  );

  test("narrows the candidate to the matched types", () => {
    const unknownCandidate: unknown = "a";

    if (is(unknownCandidate, "string", "number")) {
      expectTypeOf(unknownCandidate).toEqualTypeOf<string | number>();
    }

    if (is(unknownCandidate, "array")) {
      expectTypeOf(unknownCandidate).toEqualTypeOf<readonly unknown[]>();
    }

    if (is(unknownCandidate, "numeric")) {
      expectTypeOf(unknownCandidate).toEqualTypeOf<number | bigint>();
    }

    const candidate = "foo" as "foo" | boolean;

    if (is(candidate, "string", "number")) {
      expectTypeOf(candidate).toEqualTypeOf<"foo">();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<boolean>();
    }

    const collection = [] as readonly string[] | Date;

    if (is(collection, "array")) {
      expectTypeOf(collection).toEqualTypeOf<readonly string[]>();
    } else {
      expectTypeOf(collection).toEqualTypeOf<Date>();
    }

    // @ts-expect-error An unknown type name is rejected.
    expectTypeOf(is).toBeCallableWith(candidate, "promise");

    // @ts-expect-error `default` is a dispatch alias, never a type name.
    expectTypeOf(is).toBeCallableWith(candidate, "default");
  });
});
