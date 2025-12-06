import { describe, expect, test, vi } from "vitest";
import { tap } from "~/index";

describe("tap()", () => {
  test("calls the provided function with the value and returns the value", () => {
    const value = 42;
    const callback = vi.fn();

    const result = tap(value, callback);

    expect(callback).toHaveBeenCalledWith(value);
    expect(result).toBe(value);
  });
});
