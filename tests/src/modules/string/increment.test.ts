import { describe, expect, expectTypeOf, test } from "vitest";

import { increment } from "@auaust/toolkit/string";

describe("increment", () => {
  test("increments or appends the trailing counter", () => {
    expect(increment("file9")).toBe("file10");
    expect(increment("file")).toBe("file1");
    expect(increment("v009")).toBe("v010");
    expectTypeOf(increment("a")).toEqualTypeOf<string>();
    expect(increment(null)).toBeNull();
  });

  test("is exact past 2^53", () => {
    expect(increment("n9007199254740993")).toBe("n9007199254740994");
  });
});
