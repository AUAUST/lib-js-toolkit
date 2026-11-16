import { describe, expect, expectTypeOf, test } from "vitest";

import { whenPropertyKey } from "@auaust/toolkit";

describe("whenPropertyKey", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenPropertyKey(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenPropertyKey(
        {},
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = "a" as string | object;

    whenPropertyKey(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
      (value) => expectTypeOf(value).toEqualTypeOf<object>(),
    );
  });
});
