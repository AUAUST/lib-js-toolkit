import { after } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("after()", () => {
  test("returns a promise that calls the closure and resolves after the specified time", async () => {
    const fn = vi.fn((x: number, y: number) => x + y);

    const start = Date.now();

    return after(fn, 100, 2, 3).then((result) => {
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(98); // Allowing a small margin of error
      expect(result).toBe(5);
      expect(fn).toHaveBeenCalledWith(2, 3);
    });
  });
});
