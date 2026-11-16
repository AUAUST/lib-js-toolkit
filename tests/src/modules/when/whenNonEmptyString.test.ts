import { describe, expect, expectTypeOf, test } from "vitest";

import { whenNonEmptyString } from "@auaust/toolkit";

describe("whenNonEmptyString", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenNonEmptyString(
        "a",
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenNonEmptyString(
        "",
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types as the guard does", () => {
    const literal = "a" as "" | "a" | 1;

    whenNonEmptyString(
      literal,
      (value) => expectTypeOf(value).toEqualTypeOf<"a">(),
      (value) => expectTypeOf(value).toEqualTypeOf<"" | 1>(),
    );

    const wide = "a" as string | number;

    whenNonEmptyString(
      wide,
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
    );
  });
});
