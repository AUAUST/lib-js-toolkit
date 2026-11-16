import { describe, expect, expectTypeOf, test } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { createWhen } from "@auaust/toolkit/when";

describe("createWhen", () => {
  const whenString = createWhen(isString);

  test("resolves the branch the guard selects", () => {
    expect(whenString("a", (s) => s.toUpperCase(), 0)).toBe("A");
    expect(whenString(1, (s) => s.length, 0)).toBe(0);
    expect(whenString(1)).toBeUndefined();
    expect(whenString("a", undefined)).toBe("a");
  });

  test("forwards its receiver to the branches", () => {
    const context = {};

    expect(
      whenString.call(context, "a", function (this: typeof context) {
        return this;
      }),
    ).toBe(context);
  });

  test("narrows the branch types", () => {
    const mixed = "a" as string | number;
    const string = "a" as string;

    whenString(
      mixed,
      (candidate) => expectTypeOf(candidate).toEqualTypeOf<string>(),
      (candidate) => expectTypeOf(candidate).toEqualTypeOf<number>(),
    );

    whenString(
      string,
      (candidate) => expectTypeOf(candidate).toEqualTypeOf<string>(),
      (candidate) => expectTypeOf(candidate).toEqualTypeOf<unknown>(),
    );
  });
});
