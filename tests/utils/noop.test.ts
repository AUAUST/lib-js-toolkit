import { noop } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("noop()", () => {
  test("ignores all arguments and returns undefined", () => {
    expect(noop()).toBeUndefined();
    expect(noop(1, 2, 3)).toBeUndefined();
    expect(noop("a", "b", "c")).toBeUndefined();
    expect(noop({ key: "value" })).toBeUndefined();
  });
});
