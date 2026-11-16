import { describe, expect, test } from "vitest";

import { numeric } from "@auaust/toolkit";
import { isSorted } from "@auaust/toolkit/array";

describe("isSorted", () => {
  test("follows the default string order", () => {
    expect(isSorted([9, 10])).toBe(false);
    expect(isSorted([10, 9])).toBe(true);
  });

  test("places undefined last", () => {
    expect(isSorted([1, undefined])).toBe(true);
    expect(isSorted([undefined, 1])).toBe(false);
  });

  test("uses a comparator", () => {
    expect(isSorted([9, 10], (left, right) => left - right)).toBe(true);
    expect(isSorted([10, 9], (left, right) => left - right)).toBe(false);
  });

  test("checks the reversed order", () => {
    expect(isSorted([3, 2, 1], numeric, { reverse: true })).toBe(true);
    expect(isSorted([1, 2, 3], numeric, { reverse: true })).toBe(false);
    expect(isSorted([9, 10, 1], { reverse: true })).toBe(true);
  });

  test("treats an empty array as sorted", () => {
    expect(isSorted([])).toBe(true);
  });

  test("passes nullish through", () => {
    expect(isSorted(null)).toBeUndefined();
  });
});
