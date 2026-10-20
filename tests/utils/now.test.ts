import { now } from "@auaust/toolkit";
import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

describe("now", () => {
  afterEach(() => vi.useRealTimers());

  test("returns a fresh Date at the current time", () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    const result = now();

    expectTypeOf(result).toEqualTypeOf<Date>();
    expect(result.getTime()).toBe(Date.now());
    expect(now()).not.toBe(result);
  });
});
