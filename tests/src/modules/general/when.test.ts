import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { when } from "@auaust/toolkit";

describe("when", () => {
  test.each([true, false])(
    "evaluates only the selected branch when %s",
    (condition) => {
      const callback = vi.fn(() => "callback" as const);
      const fallback = vi.fn(() => "fallback" as const);
      const result = when(condition, callback, fallback);

      expect(result).toBe(condition ? "callback" : "fallback");
      expect(callback).toHaveBeenCalledTimes(Number(condition));
      expect(fallback).toHaveBeenCalledTimes(Number(!condition));
      expectTypeOf(result).toEqualTypeOf<"callback" | "fallback">();
    },
  );

  test("returns undefined without evaluating an unselected callback", () => {
    const callback = vi.fn();

    expect(when(false, callback)).toBeUndefined();
    expect(callback).not.toHaveBeenCalled();
  });

  test("evaluates condition callbacks anew and preserves receivers", () => {
    const context = {
      value: 42,
    };

    const condition = vi.fn(function (this: typeof context) {
      return this.value === 42;
    });

    function callback(this: typeof context) {
      return this.value + 1;
    }

    function fallback(this: typeof context) {
      return this.value - 1;
    }

    expect(when.call(context, condition, callback, fallback)).toBe(43);

    expect(
      when.call(
        {
          value: 0,
        },
        condition,
        callback,
        fallback,
      ),
    ).toBe(-1);

    expect(condition).toHaveBeenCalledTimes(2);
  });
});
