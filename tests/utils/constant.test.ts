import { constant } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";
import { createValues } from "../fixtures/values";

describe("constant", () => {
  test.for(createValues())("preserves identity for %s", (input) => {
    const result = constant(input, "ignored")();
    expect(result).toBe(input);
    expectTypeOf(result).toEqualTypeOf<typeof input>();
  });

  test("supports omitted arguments and literals", () => {
    expect(constant()()).toBeUndefined();
    expectTypeOf(constant("literal" as const)()).toEqualTypeOf<"literal">();
  });
});
