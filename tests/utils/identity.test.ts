import { identity } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";
import { createValues } from "../fixtures/values";

describe("identity", () => {
  test.for(createValues())("preserves identity for %s", (input) => {
    const result = identity(input, "ignored");
    expect(result).toBe(input);
    expectTypeOf(result).toEqualTypeOf<typeof input>();
  });

  test("supports omitted arguments and literals", () => {
    expect(identity()).toBeUndefined();
    expectTypeOf(identity("literal" as const)).toEqualTypeOf<"literal">();
  });
});
