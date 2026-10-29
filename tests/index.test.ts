import { describe, expect, test } from "vitest";

import { BUILD, object as rootObject } from "@auaust/toolkit";
import * as object from "@auaust/toolkit/object";

import packageJson from "../package.json" with { type: "json" };

describe("toolkit", () => {
  test("replaces compile time variables", () => {
    expect(__NAME__).toBe(packageJson.name);
    expect(__NAME__).toBeTypeOf("string");
    expect(__VERSION__).toBe(packageJson.version);
    expect(__VERSION__).toBeTypeOf("string");
  });

  test("exposes build metadata", () => {
    const { name, version, license } = BUILD;

    expect(name).toBe(__NAME__);
    expect(version).toBeTypeOf("string");
    expect(license).toBeTypeOf("string");
  });

  test("re-exports modules as namespaces with the identity of their entry", () => {
    expect(rootObject).toBe(object);
  });
});
