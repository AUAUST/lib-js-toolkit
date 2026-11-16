import { describe, expect, expectTypeOf, test } from "vitest";

import { whenBoolean } from "@auaust/toolkit";

describe("whenBoolean", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenBoolean(
        true,
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenBoolean(
        0,
        () => "true",
        () => "false",
      ),
    ).toBe("false");

    expect(whenBoolean(0, true, false)).toBe(false);
  });

  test("narrows the branch types", () => {
    const candidate = true as boolean | number;

    whenBoolean(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<boolean>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
    );
  });
});
