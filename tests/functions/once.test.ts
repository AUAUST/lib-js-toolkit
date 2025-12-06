import { once } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("once()", () => {
  test("calls the provided function once and caches the value", () => {
    const callback = vi.fn(() => 42);

    const result = once(callback);

    expect(callback).not.toHaveBeenCalled();

    expect(result()).toBe(42);

    expect(callback).toHaveBeenCalledOnce();

    expect(result()).toBe(42);
    expect(result()).toBe(42);
    expect(result()).toBe(42);

    expect(callback).toHaveBeenCalledOnce();
  });

  test("indicates whether it has been called", () => {
    const callback = vi.fn(() => 42);

    const result = once(callback);

    expect(result.called).toBe(false);

    result();

    expect(result.called).toBe(true);
  });

  test("allows accessing the cached value without triggering the function", () => {
    const callback = vi.fn(() => 42);

    const result = once(callback);

    expect(result.value).toBeUndefined();

    result();

    expect(result.value).toBe(42);
  });

  test("resetting allows to call the function again", () => {
    const callback = vi.fn(() => 42);

    const result = once(callback);

    expect(result()).toBe(42);
    expect(callback).toHaveBeenCalledOnce();

    expect(result.value).toBe(42);
    expect(result.called).toBe(true);

    result.reset();

    expect(result.value).toBeUndefined();
    expect(result.called).toBe(false);

    expect(result()).toBe(42);
    expect(callback).toHaveBeenCalledTimes(2);

    expect(result.value).toBe(42);
    expect(result.called).toBe(true);
  });
});
