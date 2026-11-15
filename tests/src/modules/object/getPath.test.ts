import { describe, expect, expectTypeOf, test } from "vitest";

import { getPath } from "@auaust/toolkit/object";

describe("getPath", () => {
  test("reads nested properties and array indexes", () => {
    const result = getPath(
      {
        a: [
          {
            b: 1,
          },
        ],
      },
      ["a", 0, "b"],
    );

    expectTypeOf(result).toEqualTypeOf<1>();
    expect(result).toBe(1);
  });

  test("gives undefined for a missing segment and the target for an empty path", () => {
    const target = {
      a: {
        b: 1,
      },
    };

    const missing = getPath(target, ["missing", "b"]);

    expectTypeOf(missing).toEqualTypeOf<undefined>();
    expect(missing).toBeUndefined();
    expect(getPath(target, [])).toBe(target);
  });
});
