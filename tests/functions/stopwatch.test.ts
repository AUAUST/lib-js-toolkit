import { stopwatch } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("timer()", () => {
  test("returns the elapsed time correctly", async () => {
    const elapsed = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const duration = elapsed();

    expect(typeof duration).toBe("number");
    expect(Math.abs(duration - delay)).toBeLessThan(2); // Allow 2ms of margin for timing

    await new Promise((resolve) => setTimeout(resolve, delay));

    expect(Math.abs(elapsed() - 2 * delay)).toBeLessThan(4);
  });

  test("records laps correctly", async () => {
    const t = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const lap1 = t.lap();

    expect(Math.abs(lap1.duration - delay)).toBeLessThan(2);

    await new Promise((resolve) => setTimeout(resolve, delay * 2));

    const lap2 = t.lap();

    expect(Math.abs(lap2.duration - delay * 2)).toBeLessThan(2);

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

    const lap = t.lap();

    expect(Math.abs(lap.duration - delay)).toBeLessThan(2);
  });

  test("reads laps by index correctly", async () => {
    const t = stopwatch();

    const delay = 10;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const lap1 = t.lap();

    expect(t.at(0)).toBe(lap1);
    expect(t.at(0)).toBe(t.at(-1));
    expect(t.at(1)).toBeUndefined();
  });
});
