import { describe, expect, expectTypeOf, test } from "vitest";

import { whenBlankString, type BlankString } from "@auaust/toolkit";

describe("whenBlankString", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenBlankString(
        " ",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenBlankString(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("false");

    expect(whenBlankString(" ")).toBe(" ");
  });

  test("narrows the branch types", () => {
    const candidate = " " as string | number;

    whenBlankString(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<BlankString>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string | number>(),
    );
  });
});
