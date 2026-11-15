import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

import { deprecate } from "@auaust/toolkit/function";

describe("deprecate", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("warns once over two calls and forwards this, arguments and the result", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const context = { factor: 2 };

    function multiply(this: typeof context, value: number): number {
      return this.factor * value;
    }

    const wrapped = deprecate(multiply, {
      message: "Use times.",
      name: "multiply",
    });

    expect(wrapped.name).toBe("deprecated");
    expect(wrapped.call(context, 3)).toBe(6);
    expect(wrapped.call(context, 4)).toBe(8);
    expect(warn).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledWith("multiply is deprecated. Use times.");
    expectTypeOf(wrapped).toEqualTypeOf<typeof multiply>();
  });
});
