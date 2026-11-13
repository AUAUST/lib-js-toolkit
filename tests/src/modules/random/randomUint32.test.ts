import { afterEach, expect, test, vi } from "vitest";

import { random } from "@auaust/toolkit";
import { randomUint32 } from "@auaust/toolkit/random";

import { mockRandomWords } from "#tests/testutils/mockRandomWords";

afterEach(() => {
  vi.restoreAllMocks();
});

test("exports the secure word generator through both public surfaces", () => {
  const spy = mockRandomWords(0, 0xffffffff);

  expect(random.randomUint32).toBe(randomUint32);
  expect(randomUint32()).toBe(0);
  expect(randomUint32()).toBe(0xffffffff);
  expect(spy).toHaveBeenCalledTimes(2);
});

test("propagates host generator failures", () => {
  const error = new Error("Host generator unavailable.");

  vi.spyOn(globalThis.crypto, "getRandomValues").mockImplementation(() => {
    throw error;
  });

  expect(() => randomUint32()).toThrow(error);
});
