import { describe, expect, test } from "vitest";

import * as root from "@auaust/toolkit";
import { BUILD, object as rootObject } from "@auaust/toolkit";
import * as object from "@auaust/toolkit/object";

import packageJson from "#package.json" with { type: "json" };

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
    expect(Object.isFrozen(BUILD)).toBe(true);
  });

  test("re-exports modules as namespaces with the identity of their entry", () => {
    expect(rootObject).toBe(object);
  });

  test.each([
    "after",
    "apply",
    "applyMethod",
    "attempt",
    "attemptAsync",
    "cached",
    "cachedAsync",
    "call",
    "callMethod",
    "debounce",
    "defer",
    "memoized",
    "once",
    "resolveCallable",
    "sleep",
    "spy",
    "throttle",
  ])("no longer exports the relocated %s at the root", (name) => {
    expect(root).not.toHaveProperty(name);
  });
});
