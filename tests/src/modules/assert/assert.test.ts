import { describe, expect, expectTypeOf, test } from "vitest";

import * as toolkit from "@auaust/toolkit";
import * as entry from "@auaust/toolkit/assert";
import { assert } from "@auaust/toolkit/assert";

describe("assert", () => {
  test("throws on a falsy condition only", () => {
    expect(() => assert(0)).toThrow(toolkit.AssertionError);
    expect(() => assert(0)).toThrow("Assertion failed.");
    expect(() => assert(1)).not.toThrow();
  });

  test("narrows the condition", () => {
    expectTypeOf((candidate: string | undefined) => {
      assert(candidate);

      return candidate;
    }).returns.toEqualTypeOf<string>();
  });

  test.for(Object.entries(entry).filter(([name]) => name !== "assert"))(
    "attaches %s",
    ([name, member]) => {
      expect(assert).toHaveProperty(name, member);
    },
  );

  test("shares each assertion with the root", () => {
    expect(toolkit.assertString).toBe(entry.isString);
    expect(toolkit.assertNotNull).toBe(entry.isNotNull);
  });
});
