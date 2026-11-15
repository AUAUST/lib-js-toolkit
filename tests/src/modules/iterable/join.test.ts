import { describe, expect, expectTypeOf, test } from "vitest";

import { join } from "@auaust/toolkit/iterable";

describe("join", () => {
  test("joins a lazy source as Array.prototype.join", () => {
    function* source() {
      yield 1;

      yield null;

      yield "a";
    }

    const result = join(source(), "-");

    expect(result).toBe("1--a");
    expectTypeOf(result).toEqualTypeOf<string>();
    expect(join(new Set<number>())).toBe("");
  });

  test("joins a tuple of literals into a literal type", () => {
    expectTypeOf(join(["a", "b"] as const, "-")).toEqualTypeOf<"a-b">();
  });

  test("throws on invalid arguments and passes nullish through", () => {
    expect(() => join(42 as never)).toThrow(TypeError);
    expect(() => join([1], 1 as never)).toThrow(TypeError);
    expect(join(undefined)).toBeUndefined();
  });
});
