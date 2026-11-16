import { describe, expect, test } from "vitest";

import { hasTag } from "@auaust/toolkit/object";

describe("hasTag", () => {
  test("matches the bare tag name", () => {
    expect(hasTag(async () => {}, "AsyncFunction")).toBe(true);
  });

  test("rejects another tag", () => {
    expect(hasTag(() => {}, "AsyncFunction")).toBe(false);
  });
});
