import { measure } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

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
});
