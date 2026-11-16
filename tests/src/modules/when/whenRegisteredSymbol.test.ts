import { describe, expect, expectTypeOf, test } from "vitest";

import { whenRegisteredSymbol } from "@auaust/toolkit";

describe("whenRegisteredSymbol", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenRegisteredSymbol(
        Symbol.for("a"),
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenRegisteredSymbol(
        Symbol("a"),
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = Symbol.for("a") as symbol | string;

    whenRegisteredSymbol(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<symbol>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
