import { describe, expect, expectTypeOf, test } from "vitest";

import { whenScalar } from "@auaust/toolkit";

describe("whenScalar", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenScalar(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenScalar(
        {},
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = "a" as string | object;

    whenScalar(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
      (value) => expectTypeOf(value).toEqualTypeOf<object>(),
    );
  });
});
