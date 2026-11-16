import { describe, expect, expectTypeOf, test } from "vitest";

import { whenNumeric } from "@auaust/toolkit";

describe("whenNumeric", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenNumeric(
        1,
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenNumeric(
        "1",
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = 1 as number | string;

    whenNumeric(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
