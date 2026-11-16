import { describe, expect, expectTypeOf, test } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { negate, not } from "@auaust/toolkit/predicate";

describe("negate", () => {
  test("negates the result of a predicate", () => {
    const isNotString = negate(isString);

    expect(isNotString(1)).toBe(true);
    expect(isNotString("a")).toBe(false);
    expect(isNotString.name).toBe("negated");
    expectTypeOf(isNotString(1)).toEqualTypeOf<boolean>();
  });

  test("forwards this and arguments", () => {
    const context = { limit: 2 };

    function exceeds(this: typeof context, value: number): boolean {
      return value > this.limit;
    }

    expect(negate(exceeds).call(context, 1)).toBe(true);
    expect(negate(exceeds).call(context, 3)).toBe(false);
  });

  test("is aliased not", () => {
    expect(not).toBe(negate);
  });
});
