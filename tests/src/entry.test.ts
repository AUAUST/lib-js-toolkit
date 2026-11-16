import { describe, expect, test } from "vitest";

import * as root from "@auaust/toolkit";
import { BUILD, object as rootObject } from "@auaust/toolkit";
import * as asyncModule from "@auaust/toolkit/async";
import * as functionModule from "@auaust/toolkit/function";
import * as object from "@auaust/toolkit/object";
import * as string from "@auaust/toolkit/string";

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
    expect(Object.getPrototypeOf(BUILD)).toBeNull();
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
    "defer",
    "expose",
    "keyMapper",
    "mapped",
    "mappedKeys",
    "mappedValues",
    "md5",
    "measure",
    "measureAsync",
    "memoized",
    "now",
    "plain",
    "readonly",
    "resolveCallable",
    "spy",
    "stopwatch",
    "transform",
    "transformKeys",
    "transformValues",
  ])("no longer exports the relocated %s at the root", (name) => {
    expect(root).not.toHaveProperty(name);
  });

  test("exports isSelf at the root and no longer object.is", () => {
    expect(root.isSelf).toBe(Object.is);
    expect(root.isSelf).toBe(object.isSelf);
    expect(object).not.toHaveProperty("is");
  });

  test("exports unambiguous helpers at the root", () => {
    expect(root.toCamelCase).toBe(string.toCamelCase);
    expect(root.pascal).toBe(string.toPascalCase);
    expect(root.once).toBe(functionModule.once);
    expect(root.debounce).toBe(functionModule.debounce);
    expect(root.throttle).toBe(functionModule.throttle);
    expect(root.sleep).toBe(asyncModule.sleep);
    expect(root.freeze).toBe(object.freeze);
  });
});
