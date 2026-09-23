import { BUILD } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("The package", () => {
  test("exposes build metadata", () => {
    const { name, version, license, timestamp } = BUILD;

    expect(name).toBe("@auaust/toolkit");

    expect(version).toBeTypeOf("string");

    expect(license).toBeTypeOf("string");

    expect(timestamp).toBeTypeOf("string");

    expect(new Date(timestamp).getTime()).not.toBeNaN();
  });
});
