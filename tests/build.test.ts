import { BUILD } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";
import packageJson from "../package.json" with { type: "json" };

describe("The package", () => {
  test("replaces compile time variables", () => {
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
