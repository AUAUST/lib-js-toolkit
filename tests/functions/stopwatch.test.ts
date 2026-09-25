import { stopwatch } from "@auaust/toolkit";
import { afterEach, describe, expect, test, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("stopwatch()", () => {
  test("uses the performance timeline by default", () => {
    let time = 100;

    vi.spyOn(performance, "now").mockImplementation(() => time);

    const timer = stopwatch();

    time = 125;

    expect(timer.start).toBe(100);

    expect(timer()).toBe(25);
  });

  test("accepts a numeric start on the selected timeline", () => {
    vi.spyOn(performance, "now").mockReturnValue(125);

    vi.spyOn(Date, "now").mockReturnValue(1_000);

    expect(stopwatch(100)()).toBe(25);

    expect(stopwatch({ startAt: 900, usePerformance: false })()).toBe(100);
  });

  test("uses the date timeline when a Date is passed directly", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000);

    const timer = stopwatch(new Date(900));

    expect(timer.start).toBe(900);

    expect(timer()).toBe(100);
  });

  test("normalizes a Date onto the performance timeline when explicitly requested", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000);

    vi.spyOn(performance, "now").mockReturnValue(200);

    const timer = stopwatch({
      startAt: new Date(900),
      usePerformance: true,
    });

    expect(timer.start).toBe(100);
    expect(timer()).toBe(100);
  });

  test("records and reads laps", () => {
    let time = 0;

    vi.spyOn(performance, "now").mockImplementation(() => time);

    const timer = stopwatch<string>();

    time = 10;

    expect(timer.lap("first")).toBe(10);

    time = 30;

    expect(timer.lap("second")).toBe(20);
    expect(timer.laps).toHaveLength(2);

    expect(timer.laps[0]).toEqual({
      index: 0,
      name: "first",
      duration: 10,
      timestamp: 10,
    });

    expect(timer.laps.at(-1)?.name).toBe("second");
    expect(timer.laps.at(2)).toBeUndefined();
  });

  test("excludes paused gaps from elapsed and lap time", () => {
    let time = 0;

    vi.spyOn(performance, "now").mockImplementation(() => time);

    const timer = stopwatch();

    time = 10;

    timer.pause();

    expect(timer.running).toBe(false);

    expect(timer()).toBe(10);

    expect(timer.periods[0]).toMatchObject({
      start: 0,
      end: 10,
      duration: 10,
    });

    time = 30;

    expect(timer()).toBe(10);

    timer.resume();

    expect(timer.running).toBe(true);
    expect(timer.periods).toHaveLength(2);

    time = 45;

    expect(timer()).toBe(25);
    expect(timer.lap()).toBe(25);

    expect(timer.periods[1]).toMatchObject({
      start: 30,
      end: undefined,
      duration: 15,
    });
  });

  test("throws an StateError when lapping a paused timer", () => {
    vi.spyOn(performance, "now").mockReturnValue(0);

    const timer = stopwatch();

    timer.pause();

    expect(() => timer.lap()).toThrow(
      expect.objectContaining({ name: "StateError" }),
    );
  });

  test("stop clears state and restart starts a fresh timeline", () => {
    let time = 0;

    vi.spyOn(performance, "now").mockImplementation(() => time);

    const timer = stopwatch();

    time = 10;

    timer.lap();
    timer.pause();

    time = 20;

    timer.resume();

    time = 25;

    timer.stop();

    expect(timer.running).toBe(false);
    expect(timer.start).toBe(25);
    expect(timer()).toBe(0);
    expect(timer.laps).toHaveLength(0);
    expect(timer.periods).toHaveLength(0);

    time = 40;

    timer.restart();

    expect(timer.running).toBe(true);
    expect(timer.start).toBe(40);
    expect(timer.periods).toHaveLength(1);

    time = 47;

    expect(timer.lap()).toBe(7);
  });

  test("clear removes laps without resetting the lap interval", () => {
    let time = 0;

    vi.spyOn(performance, "now").mockImplementation(() => time);

    const timer = stopwatch();

    time = 10;

    timer.lap();
    timer.clear();

    time = 15;

    expect(timer.lap()).toBe(5);
    expect(timer.laps).toHaveLength(1);
  });
});
