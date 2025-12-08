import { identity } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("identity()", () => {
  test("returns the first argument", () => {
    expect(identity()).toBeUndefined();
    expect(identity(1, 2, 3)).toBe(1);
    expect(identity("a", "b", "c")).toBe("a");
    expect(identity({ key: "value" })).toEqual({ key: "value" });
  });
});
