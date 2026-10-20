import { BUILD } from "@auaust/toolkit";
import { describe, expect, test, expectTypeOf } from "vitest";
import packageJson from "../package.json" with { type: "json" };

describe("toolkit", () => {
  test("replaces compile time variables", () => {
    expectTypeOf(BUILD.timestamp).toEqualTypeOf<Date>();
    expect(__NAME__).toBe(packageJson.name);
    expect(__NAME__).toBeTypeOf("string");
    expect(__VERSION__).toBe(packageJson.version);
    expect(__VERSION__).toBeTypeOf("string");
  });

  test("exposes build metadata", () => {
    const { name, version, license, timestamp } = BUILD;

    expect(name).toBe(__NAME__);
    expect(version).toBeTypeOf("string");
    expect(license).toBeTypeOf("string");
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).not.toBeNaN();
  });
});
