import { describe, expect, expectTypeOf, test } from "vitest";

import { pipeComparator } from "@auaust/toolkit";

describe("pipeComparator", () => {
  test("returns a reusable comparison over the transform", () => {
    const sameLowercase = pipeComparator((s: string) => s.toLowerCase());

    expectTypeOf(sameLowercase).parameters.toEqualTypeOf<string[]>();
    expect(sameLowercase("AUAUST", "auaust", "Auaust")).toBe(true);
    expect(sameLowercase("AUAUST", "toolkit")).toBe(false);
  });
});
