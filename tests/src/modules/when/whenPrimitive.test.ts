import { describe, expect, expectTypeOf, test } from "vitest";

import { whenPrimitive } from "@auaust/toolkit";

describe("whenPrimitive", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenPrimitive(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenPrimitive(
        {},
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = "a" as string | object;

    whenPrimitive(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
      (value) => expectTypeOf(value).toEqualTypeOf<object>(),
    );
  });
});
