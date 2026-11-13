import { afterEach, expect, test, vi } from "vitest";

import { insecureRandom } from "@auaust/toolkit/random";

afterEach(() => {
  vi.restoreAllMocks();
});

test("calls Math.random", () => {
  const spy = vi.spyOn(Math, "random").mockReturnValue(0.25);

  expect(insecureRandom()).toBe(0.25);
  expect(spy).toHaveBeenCalledOnce();
});
