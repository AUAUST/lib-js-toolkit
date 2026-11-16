import { describe, expect, expectTypeOf, test } from "vitest";

import { whenNullish } from "@auaust/toolkit";

describe("whenNullish", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenNullish(
        null,
        () => "true",
        () => "false",
      ),
    ).toBe("true");

    expect(
      whenNullish(
        0,
        () => "true",
        () => "false",
      ),
    ).toBe("false");
  });

  test("resolves the issue's examples", () => {
    expect(
      whenNullish(
        null,
        () => "missing",
        (value) => value,
      ),
    ).toBe("missing");

    expect(whenNullish(0)).toBeUndefined();
  });

  test("narrows the branch types", () => {
    const candidate = null as string | null | undefined;

    whenNullish(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<null | undefined>(),
      (value) => expectTypeOf(value).toEqualTypeOf<string>(),
    );
  });
});
