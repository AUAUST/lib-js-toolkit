import { describe, expect, expectTypeOf, test } from "vitest";

import * as toolkit from "@auaust/toolkit";
import * as entry from "@auaust/toolkit/ensure";
import { ensure } from "@auaust/toolkit/ensure";
import { isString } from "@auaust/toolkit/guard";

describe("ensure", () => {
  test("returns the candidate when the guard passes", () => {
    const candidate = {};

    expect(ensure(toolkit.isObject, candidate)).toBe(candidate);
    expect(() => ensure(isString, 1)).toThrow(toolkit.AssertionError);
    expect(() => ensure(isString, 1)).toThrow("Expected the guard to pass.");
    expect(() => ensure(isString, 1, "custom")).toThrow("custom");
  });

  test("keeps the guarded members of the candidate", () => {
    expectTypeOf((candidate: "a" | 1) => {
      return ensure(isString, candidate);
    }).returns.toEqualTypeOf<"a">();

    expectTypeOf((candidate: unknown) => {
      return ensure(isString, candidate);
    }).returns.toEqualTypeOf<string>();
  });

  test.for(
    Object.entries(entry).filter(([name]) => {
      return name !== "ensure" && name !== "defined";
    }),
  )("attaches %s", ([name, member]) => {
    expect(ensure).toHaveProperty(name, member);
  });

  test("shares each ensure helper and defined with the root", () => {
    expect(toolkit.ensureString).toBe(entry.isString);
    expect(toolkit.defined).toBe(entry.defined);
  });
});
