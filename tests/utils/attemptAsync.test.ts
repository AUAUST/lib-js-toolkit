import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { attemptAsync, type AttemptResult } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("attemptAsync", () => {
  test("returns the result of a successful function call", async () => {
    const fn = vi.fn((x: number, y: number) => x + y);
    const attempting = attemptAsync(fn, 2, 3);

    expect(attempting).toBeInstanceOf(Promise);

    const { success, result, error } = await attempting;

    expect(success).toBe(true);
    expect(result).toBe(5);
    expect(error).toBeUndefined();
    expect(fn).toHaveBeenCalledWith(2, 3);
  });

  test("returns the error of a failed function call", async () => {
    const fn = vi.fn(() => {
      throw new Error("Test Error");
    });

    const { success, result, error } = await attemptAsync(fn);

    expect(success).toBe(false);
    expect(result).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Test Error");
    expect(fn).toHaveBeenCalled();
  });

  test("infers awaited return types from callable callbacks", async () => {
    const callback = {
      [callable](key: "entry", ...ignored: number[]) {
        return Promise.resolve(key);
      },
    };

    const result = attemptAsync(callback, "entry", 1, 2);

    expectTypeOf(result).toEqualTypeOf<Promise<AttemptResult<"entry">>>();
    expect((await result).result).toBe("entry");
  });
});
