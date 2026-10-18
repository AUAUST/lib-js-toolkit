import { measure, type MeasureResult } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("measure()", () => {
  test("returns the result of a successful function call along with the duration", () => {
    const fn = vi.fn((x: number, y: number) => x + y);

    const { result, duration } = measure(fn, 2, 3);

    expect(result).toBe(5);
    expect(typeof duration).toBe("number");
    expect(duration).toBeGreaterThanOrEqual(0);
    expect(duration).toBeLessThan(25); // 25 is already quite high for such a simple function, but gives a bit of leeway
    expect(fn).toHaveBeenCalledWith(2, 3);
  });

  test("infers optional and rest arguments and synchronous results", () => {
    function callback(first: "entry", count = 1, ...values: number[]) {
      return first.length + count + values.length;
    }

    const measured = measure(callback, "entry");

    expectTypeOf(measured).toEqualTypeOf<MeasureResult<number>>();

    expect(measured.result).toBe(6);

    if (false) {
      // @ts-expect-error Callback argument types must be preserved.
      measure(callback, "other");
    }
  });
});
