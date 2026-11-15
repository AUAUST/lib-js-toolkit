import { describe, expect, expectTypeOf, test } from "vitest";

import { isGeneratorFunction } from "@auaust/toolkit/function";
import type { Fn } from "@auaust/toolkit";

describe("isGeneratorFunction", () => {
  test("recognizes generator functions only", () => {
    expect(isGeneratorFunction(function* () {})).toBe(true);
    expect(isGeneratorFunction(async function* () {})).toBe(false);
    expect(isGeneratorFunction(() => {})).toBe(false);
  });

  test("narrows on both branches", () => {
    const candidate = (() => {}) as Fn<Generator> | string;

    if (isGeneratorFunction(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<Fn<Generator>>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  });
});
