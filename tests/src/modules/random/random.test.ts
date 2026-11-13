import { afterEach, expect, test, vi } from "vitest";

import { random } from "@auaust/toolkit/random";

import { mockRandomWords } from "#tests/testutils/mockRandomWords";

afterEach(() => {
  vi.restoreAllMocks();
});

test("uses 53 secure bits for both extremes", () => {
  mockRandomWords(0, 0, 0xffffffff, 0xffffffff);

  expect(random()).toBe(0);
  expect(random()).toBe(1 - 2 ** -53);
});
