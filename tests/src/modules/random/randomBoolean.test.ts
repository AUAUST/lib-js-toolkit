import { expect, test } from "vitest";

import { randomBoolean } from "@auaust/toolkit/random";

test("follows certain probabilities", () => {
  for (let index = 0; index < 100; index++) {
    expect(randomBoolean(0)).toBe(false);
    expect(randomBoolean(1)).toBe(true);
  }
});

test("rejects a probability outside [0, 1]", () => {
  expect(() => randomBoolean(2)).toThrow(RangeError);
});
