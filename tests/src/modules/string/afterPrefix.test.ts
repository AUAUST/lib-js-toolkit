import { describe, expect, expectTypeOf, test } from "vitest";

import { afterPrefix } from "@auaust/toolkit/string";

describe("afterPrefix", () => {
  test("returns the rest after the prefix", () => {
    expect(afterPrefix("/root/a", "/root/")).toBe("a");
    expect(afterPrefix("/root/", "/root/")).toBe("");

    expectTypeOf(afterPrefix("/root/a", "/root/")).toEqualTypeOf<
      string | undefined
    >();
  });

  test("returns undefined for a missing prefix or a nullish string", () => {
    expect(afterPrefix("/other", "/root/")).toBeUndefined();
    expect(afterPrefix(null, "/root/")).toBeUndefined();
  });
});
