import { describe, expect, expectTypeOf, test } from "vitest";

import { isAsyncGeneratorFunction } from "@auaust/toolkit/function";
import type { Fn } from "@auaust/toolkit";

describe("isAsyncGeneratorFunction", () => {
  test("recognizes async generator functions only", () => {
    expect(isAsyncGeneratorFunction(async function* () {})).toBe(true);
    expect(isAsyncGeneratorFunction(function* () {})).toBe(false);
    expect(isAsyncGeneratorFunction(async () => {})).toBe(false);
  });

  test("narrows on both branches", () => {
    const candidate = (() => {}) as Fn<AsyncGenerator> | string;

    if (isAsyncGeneratorFunction(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<Fn<AsyncGenerator>>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  });
});
