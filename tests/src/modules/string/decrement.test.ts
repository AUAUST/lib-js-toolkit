import { describe, expect, test } from "vitest";

import { decrement } from "@auaust/toolkit/string";

describe("decrement", () => {
  test("keeps the width and a zero counter", () => {
    expect(decrement("v010")).toBe("v009");
    expect(decrement("v001")).toBe("v000");
  });

  test("throws below zero", () => {
    expect(() => decrement("file0")).toThrow(RangeError);
    expect(() => decrement("file")).toThrow(RangeError);
  });
});
