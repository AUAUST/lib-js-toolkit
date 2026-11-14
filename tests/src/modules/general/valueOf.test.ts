import { describe, expect, test } from "vitest";

import { valueOf } from "@auaust/toolkit";

describe("valueOf", () => {
  test("unwraps a boxed number", () => {
    expect(valueOf(new Object(1))).toBe(1);
  });

  test("returns a null-prototype object as is", () => {
    const value = Object.create(null) as object;

    expect(valueOf(value)).toBe(value);
  });
});
