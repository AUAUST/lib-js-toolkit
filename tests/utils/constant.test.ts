import { constant } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("constant()", () => {
  test("returns a function that returns the first argument", () => {
    expect(constant()()).toBeUndefined();
    expect(constant(1, 2, 3)()).toBe(1);
    expect(constant("a", "b", "c")()).toBe("a");
    expect(constant({ key: "value" })()).toEqual({ key: "value" });
  });
});
