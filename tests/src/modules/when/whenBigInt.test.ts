import { describe, expect, expectTypeOf, test } from "vitest";

import { whenBigInt } from "@auaust/toolkit";

describe("whenBigInt", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenBigInt(
        1n,
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenBigInt(
        1,
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = 1n as bigint | string;

    whenBigInt(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<bigint>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
