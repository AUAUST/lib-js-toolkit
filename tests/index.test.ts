import { describe, expect, test } from "vitest";

import hello from "@auaust/toolkit";

describe("Main export", () => {
  test("says hello", () => {
    expect(hello).toBe("Hello, World!");
  });
});
