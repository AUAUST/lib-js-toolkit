import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

import { measure, type MeasureResult } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("measure", () => {
  afterEach(() => vi.restoreAllMocks());

  test("returns the result of a successful function call along with the duration", () => {
    vi.spyOn(performance, "now").mockReturnValueOnce(10).mockReturnValue(35);

    const fn = vi.fn((x: number, y: number) => x + y);
    const result = measure(fn, 2, 3);

    expect(result).toEqual({
      result: 5,
      start: 10,
      end: 35,
      duration: 25,
    });

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

  test("invokes callable objects with their receiver and full arguments", () => {
    const callback = {
      factor: 2,
      [callable](count: number, ...extra: number[]) {
        return this.factor * count + extra.length;
      },
    };

    const result = measure(callback, 4, 9);

    expectTypeOf(result.result).toEqualTypeOf<number>();
    expect(result.result).toBe(9);

    expect(
      measure.call(
        {
          factor: 3,
        },
        callback,
        4,
      ).result,
    ).toBe(12);
  });
});
