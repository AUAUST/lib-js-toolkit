import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { isNumber, isString } from "@auaust/toolkit/guard";
import { allOf, anyOf, noneOf } from "@auaust/toolkit/predicate";

describe("allOf", () => {
  test("stops at the first failing predicate", () => {
    const last = vi.fn(() => true);
    const conjoined = allOf(isNumber, (value: number) => value > 1, last);

    expect(conjoined(0)).toBe(false);
    expect(last).not.toHaveBeenCalled();
    expect(conjoined(2)).toBe(true);
    expect(last).toHaveBeenCalledWith(2);
  });

  test("forwards this", () => {
    const context = { limit: 2 };

    function exceeds(this: typeof context, value: number): boolean {
      return value > this.limit;
    }

    expect(allOf(exceeds).call(context, 3)).toBe(true);
  });
});

describe("anyOf", () => {
  test("narrows to the union of guarded types", () => {
    const items: unknown[] = ["a", 1, null];
    const filtered = items.filter(anyOf(isString, isNumber));

    expect(filtered).toEqual(["a", 1]);
    expectTypeOf(filtered).toEqualTypeOf<(string | number)[]>();
  });
});

describe("noneOf", () => {
  test("rejects what any predicate accepts", () => {
    expect(noneOf(isString, isNumber)("a")).toBe(false);
    expect(noneOf(isString, isNumber)(null)).toBe(true);
  });

  test("accepts everything with no predicate", () => {
    expect(noneOf()(undefined)).toBe(true);
  });
});
