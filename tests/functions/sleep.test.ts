import { sleep } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("sleep()", () => {
  test("returns a promise that resolves after the specified time", async () => {
    const start = Date.now();

    return sleep(100).then(() => {
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(100);
    });
  });
});
