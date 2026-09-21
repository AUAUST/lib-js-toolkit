import { on } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("on()", () => {
  test("calls the final argument with all preceding arguments", () => {
    const callback = vi.fn((left: number, right: number) => left + right);

    const result = on(20, 22, callback);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(20, 22);
    expect(result).toBe(42);
  });

  test("supports callbacks without arguments", () => {
    expect(on(() => "result")).toBe("result");
  });

  test("preserves the callback return type", () => {
    const result = on(42, (value) => value.toString());

    expectTypeOf(result).toEqualTypeOf<string>();
  });

  test("preserves 'this' context in the callback", () => {
    const context = { value: 42 };

    function callback(this: typeof context, increment: number) {
      expect(this).toBe(context);

      return this.value + increment;
    }

    const result = on.call<any, any, number>(context, 1, callback);

    expect(result).toBe(43);
  });

  test("calls function arguments before calling the callback", () => {
    const arg1 = vi.fn(() => 20);
    const arg2 = vi.fn(() => 22);
    const callback = vi.fn((left: number, right: number) => left + right);

    const result = on(arg1, arg2, callback);

    expect(arg1).toHaveBeenCalledOnce();
    expect(arg2).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(20, 22);
    expect(result).toBe(42);
  });

  test("resolves function arguments in the callback parameter types", () => {
    const result = on(
      42,
      () => "value" as const,
      (number, string) => `${string}: ${number}`,
    );

    expectTypeOf(result).toEqualTypeOf<"value: 42">();
    expect(result).toBe("value: 42");
  });
});
