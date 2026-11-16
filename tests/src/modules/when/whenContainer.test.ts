import { describe, expect, expectTypeOf, test } from "vitest";

import { whenContainer } from "@auaust/toolkit";

describe("whenContainer", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenContainer(
        {},
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenContainer(
        1,
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = {} as object | number;

    whenContainer(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<object>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
    );
  });
});
