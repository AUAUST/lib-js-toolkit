import { now } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("now()", () => {
  test("returns a Date object representing the current date and time", () => {
    const result = now();

    expect(result).toBeInstanceOf(Date);

    const nowDate = new Date();

    expect(result.getTime()).toBeCloseTo(nowDate.getTime(), -2);
  });
});
