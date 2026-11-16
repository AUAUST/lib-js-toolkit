import { describe, expect, expectTypeOf, test } from "vitest";

import { whenString } from "@auaust/toolkit";

describe("whenString", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenString(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenString(
        0,
        () => "true",
        () => "false",
      ),
    ).toBe("false");

    expect(whenString("a", (s) => s.toUpperCase(), 0)).toBe("A");
  });

  test("narrows the branch types", () => {
    const candidate = "a" as string | number;

    whenString(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
    );
  });
});
