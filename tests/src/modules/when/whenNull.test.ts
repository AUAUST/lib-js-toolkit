import { describe, expect, expectTypeOf, test } from "vitest";

import { whenNull } from "@auaust/toolkit";

describe("whenNull", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenNull(
        null,
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenNull(
        undefined,
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = null as string | null;

    whenNull(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<null>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
