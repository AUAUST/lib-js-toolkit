import { describe, expect, expectTypeOf, test } from "vitest";

import { join } from "@auaust/toolkit/array";

describe("join", () => {
  test("joins a tuple of literals into a literal type", () => {
    const result = join(["a", "b"] as const, "-");

    expect(result).toBe("a-b");
    expectTypeOf(result).toEqualTypeOf<"a-b">();

    const mixed = join([1, null, true] as const);

    expect(mixed).toBe("1,,true");
    expectTypeOf(mixed).toEqualTypeOf<"1,,true">();
  });

  test("widens wide items and separators", () => {
    const items: string[] = ["a"];

    expectTypeOf(join(items, "-")).toEqualTypeOf<string>();

    expectTypeOf(
      join(["a", "b"] as const, "-" as string),
    ).toEqualTypeOf<string>();
  });

  test("joins holes and nullish items as empty and passes nullish through", () => {
    const sparse: (number | undefined)[] = [1, undefined];

    sparse.length = 3;

    expect(join(sparse)).toBe("1,,");
    expect(join(null, "-")).toBeUndefined();
  });
});
