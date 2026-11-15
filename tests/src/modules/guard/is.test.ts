import { describe, expect, expectTypeOf, test } from "vitest";

import { is } from "@auaust/toolkit/guard";

describe("is", () => {
  test("matches any of the given type names", () => {
    expect(is("a", "number", "string")).toBe(true);
    expect(is(() => {}, "object")).toBe(false);
    expect(is(() => {}, "container")).toBe(true);
    expect(is(null, "object")).toBe(false);
  });

  test("narrows the candidate to the matched types", () => {
    const unknownCandidate: unknown = "a";

    if (is(unknownCandidate, "string", "number")) {
      expectTypeOf(unknownCandidate).toEqualTypeOf<string | number>();
    }

    const candidate = "foo" as "foo" | boolean;

    if (is(candidate, "string", "number")) {
      expectTypeOf(candidate).toEqualTypeOf<"foo">();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<boolean>();
    }

    // @ts-expect-error An unknown type name is rejected.
    expectTypeOf(is).toBeCallableWith(candidate, "promise");
  });
});
