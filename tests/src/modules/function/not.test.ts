import { describe, expect, expectTypeOf, test } from "vitest";

import { not } from "@auaust/toolkit/function";
import { isString } from "@auaust/toolkit/guard";

describe("not", () => {
  test("negates the result of a predicate", () => {
    const isNotString = not(isString);

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

    expect(not(exceeds).call(context, 1)).toBe(true);
    expect(not(exceeds).call(context, 3)).toBe(false);
  });
});
