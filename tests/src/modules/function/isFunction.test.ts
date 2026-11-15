import { describe, expect, expectTypeOf, test } from "vitest";

import { is, isFunction } from "@auaust/toolkit/guard";
import type { UnknownFn } from "@auaust/toolkit/types";

import {
  createFunctions,
  createObjects,
  primitiveValues,
} from "#tests/fixtures/values";

describe("isFunction", () => {
  test.for(createFunctions())("recognizes function %s", (input) => {
    expect(isFunction(input)).toBe(true);
    expectTypeOf(isFunction(input)).toEqualTypeOf<boolean>();
  });

  test.for([...primitiveValues, ...createObjects()])(
    "rejects non-callable %s",
    (input) => {
      expect(isFunction(input)).toBe(false);
    },
  );

  test("narrows unknown to UnknownFn, like is(candidate, 'function')", () => {
    const candidate: unknown = () => 1;

    if (isFunction(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<UnknownFn>();
    }

    if (is(candidate, "function")) {
      expectTypeOf(candidate).toEqualTypeOf<UnknownFn>();
    }
  });

  test("keeps union members on each branch", () => {
    const candidate = (() => 1) as string | (() => number);

    if (isFunction(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<() => number>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  });

  test("takes the candidate only", () => {
    expectTypeOf(isFunction).parameters.toEqualTypeOf<[candidate: unknown]>();
  });
});
