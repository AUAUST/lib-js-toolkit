import { attempt, type AttemptResult } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("attempt()", () => {
  test("returns the result of a successful function call", () => {
    const fn = vi.fn((x: number, y: number) => x + y);

    const { success, result, error } = attempt(fn, 2, 3);

    expect(success).toBe(true);
    expect(result).toBe(5);
    expect(error).toBeUndefined();
    expect(fn).toHaveBeenCalledWith(2, 3);
  });

  test("returns the error of a failed function call", () => {
    const fn = vi.fn(() => {
      throw new Error("Test Error");
    });

    const { success, result, error } = attempt(fn);

    expect(success).toBe(false);
    expect(result).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Test Error");
    expect(fn).toHaveBeenCalled();
  });

  test("infers invocation arguments and preserves synchronous results", () => {
    function callback(first: "entry", count = 1, ...values: number[]) {
      return first.length + count + values.length;
    }

    const attempted = attempt(callback, "entry", 2, 3);
    const promised = attempt(() => {
      return Promise.resolve("entry" as const);
    });

    expectTypeOf(attempted).toEqualTypeOf<AttemptResult<number>>();

    expectTypeOf(promised).toEqualTypeOf<AttemptResult<Promise<"entry">>>();

    expect(attempted.result).toBe(8);

    if (false) {
      // @ts-expect-error The first callback argument is required.
      attempt(callback);
    }
  });
});
