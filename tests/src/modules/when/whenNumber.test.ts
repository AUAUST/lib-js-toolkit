import { describe, expect, expectTypeOf, test } from "vitest";

import { whenNumber } from "@auaust/toolkit";

describe("whenNumber", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenNumber(1, "true", "false")).toBe("true");
    expect(whenNumber("1", "true", "false")).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = 1 as string | number;

    whenNumber(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
