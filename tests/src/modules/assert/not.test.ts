import { describe, expect, expectTypeOf, test } from "vitest";

import { AssertionError, type Falsy } from "@auaust/toolkit";
import { not } from "@auaust/toolkit/assert";

describe("not", () => {
  test("throws on a truthy condition only", () => {
    expect(() => not(1)).toThrow(AssertionError);
    expect(() => not(1)).toThrow("Expected a falsy value.");
    expect(() => not(0)).not.toThrow();
  });

  test("narrows the condition to its falsy members", () => {
    expectTypeOf((candidate: string | null) => {
      not(candidate);

      return candidate;
    }).returns.toEqualTypeOf<"" | null>();

    expectTypeOf(not).asserts.toEqualTypeOf<Falsy>();
  });
});
