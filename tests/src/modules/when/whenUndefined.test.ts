import { describe, expect, expectTypeOf, test } from "vitest";

import { whenUndefined } from "@auaust/toolkit";

describe("whenUndefined", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenUndefined(
        undefined,
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenUndefined(
        null,
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("narrows the branch types", () => {
    const candidate = undefined as string | undefined;

    whenUndefined(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<undefined>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
