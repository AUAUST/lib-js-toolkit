import { BUILD } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("The package", () => {
  test("exposes build metadata", () => {
    expect(BUILD.name).toBe("@auaust/toolkit");
    expect(BUILD.version).toBeTypeOf("string");
    expect(BUILD.license).toBeTypeOf("string");

    expect(BUILD.timestamp).toBeTypeOf("string");

    expect(new Date(BUILD.timestamp).getTime()).not.toBeNaN();
  });
});
