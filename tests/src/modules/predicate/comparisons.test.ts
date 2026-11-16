import { describe, expect, test } from "vitest";

import { isBetween } from "@auaust/toolkit/number";
import {
  between,
  greaterThan,
  greaterThanOrEqual,
  gt,
  gte,
  lessThan,
  lessThanOrEqual,
  lt,
  lte,
} from "@auaust/toolkit/predicate";

describe("comparisons", () => {
  test("compare with the operator their name states", () => {
    expect(greaterThan(5)(10)).toBe(true);
    expect(greaterThan(5)(5)).toBe(false);
    expect(greaterThanOrEqual(5)(5)).toBe(true);
    expect(lessThan(5)(5)).toBe(false);
    expect(lessThanOrEqual(5n)(5n)).toBe(true);
  });

  test("are aliased", () => {
    expect(gt).toBe(greaterThan);
    expect(gte).toBe(greaterThanOrEqual);
    expect(lt).toBe(lessThan);
    expect(lte).toBe(lessThanOrEqual);
  });
});

describe("between", () => {
  test("follows number.isBetween", () => {
    expect(between(1, 3)(Infinity)).toBe(isBetween(Infinity, 1, 3));
    expect(between(1, 3)(2)).toBe(true);
    expect(between(1n, 3n)(3n)).toBe(true);
  });
});
