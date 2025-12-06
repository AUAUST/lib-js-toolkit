import { spy } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("spy()", () => {
  test("calls the listener before the closure by default", () => {
    const closure = vi.fn((x: number) => x * 2);
    const listener = vi.fn();

    const spiedFunction = spy(closure, listener);

    const result = spiedFunction(5);

    expect(result).toBe(10);
    expect(listener).toHaveBeenCalledBefore(closure);
    expect(listener).toHaveBeenCalledWith(5);
  });

  test("calls the listener after the closure when specified", () => {
    const closure = vi.fn((x: number) => x * 2);
    const listener = vi.fn();

    const spiedFunction = spy(closure, listener, { after: true });

    const result = spiedFunction(5);

    expect(result).toBe(10);
    expect(listener).toHaveBeenCalledAfter(closure);
    expect(listener).toHaveBeenCalledWith(5);
    expect(listener).toHaveBeenCalledOnce();
  });

  test("calls the listener both before and after the closure when specified", () => {
    const closure = vi.fn((x: number) => x * 2);
    const listener = vi.fn();

    const spiedFunction = spy(closure, listener, { before: true, after: true });

    const result = spiedFunction(5);

    expect(result).toBe(10);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenNthCalledWith(1, 5);
    expect(listener).toHaveBeenNthCalledWith(2, 5);
  });

  test("calls the listener with the result as `this` context if called after", () => {
    const closure = vi.fn((x: number) => x * 2);

    const spiedFunction = spy(
      closure,
      function () {
        expect(this).toBe(10);
      },
      { after: true }
    );

    const result = spiedFunction(5);

    expect(result).toBe(10);
  });
});
