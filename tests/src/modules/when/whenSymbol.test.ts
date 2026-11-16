import { describe, expect, expectTypeOf, test } from "vitest";

import { whenSymbol } from "@auaust/toolkit";

describe("whenSymbol", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenSymbol(
        Symbol("a"),
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenSymbol(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = Symbol("a") as symbol | string;

    whenSymbol(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<symbol>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
