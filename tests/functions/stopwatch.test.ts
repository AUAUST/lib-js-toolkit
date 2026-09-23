import { stopwatch } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("timer()", () => {
  test("returns the elapsed time correctly", async () => {
    const elapsed = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const duration = elapsed();

    expect(typeof duration).toBe("number");
    expect(Math.abs(duration - delay)).toBeLessThan(5); // Allow 5ms of margin for timing

    await new Promise((resolve) => setTimeout(resolve, delay));

    expect(Math.abs(elapsed() - 2 * delay)).toBeLessThan(10);
  });

  test("records laps correctly", async () => {
    const t = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const lapDuration1 = t.lap();

    expect(Math.abs(lapDuration1 - delay)).toBeLessThan(5);

    await new Promise((resolve) => setTimeout(resolve, delay * 2));

    const lapDuration2 = t.lap();

    expect(Math.abs(lapDuration2 - delay * 2)).toBeLessThan(5);

    expect(t.laps.length).toBe(2);
  });

  test("clears laps correctly", async () => {
    const t = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    t.lap();

    expect(t.laps.length).toBe(1);

    t.clear();

    expect(t.laps.length).toBe(0);
  });

  test("allows restarting the timer correctly", async () => {
    const t = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    t.lap();

    expect(t.laps.length).toBe(1);

    t.restart();

    expect(t.laps.length).toBe(0);

    await new Promise((resolve) => setTimeout(resolve, delay));

    const lapDuration = t.lap();

    expect(Math.abs(lapDuration - delay)).toBeLessThan(5);
  });

  test("reads laps by index correctly", async () => {
    const t = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const lapDuration1 = t.lap();

    expect(t.at(0)?.duration).toBe(lapDuration1);
    expect(t.at(0)?.duration).toBe(t.at(-1)?.duration);
    expect(t.at(1)).toBeUndefined();
  });
});
