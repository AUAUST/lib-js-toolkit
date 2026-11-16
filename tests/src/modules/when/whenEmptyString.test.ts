import { describe, expect, expectTypeOf, test } from "vitest";

import { whenEmptyString, type EmptyString } from "@auaust/toolkit";

describe("whenEmptyString", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenEmptyString(
        "",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenEmptyString(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = "" as string | number;

    whenEmptyString(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<EmptyString>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string | number>(),
    );
  });
});
