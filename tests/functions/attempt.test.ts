import { attempt } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

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
});
