import { afterEach, expect, test, vi } from "vitest";

import { insecureRandom } from "@auaust/toolkit/random";

afterEach(() => {
  vi.restoreAllMocks();
});

test("calls Math.random", () => {
  expect(insecureRandom()).toBeTypeOf("number");
  expect(insecureRandom).toBe(Math.random);
});
