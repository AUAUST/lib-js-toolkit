import { describe, expect, expectTypeOf, test } from "vitest";

import { md5 } from "@auaust/toolkit/string";

import { createValues } from "#tests/fixtures/values";

describe("md5", () => {
  test.each([
    [" ", "7215ee9c7d9dc229d2921a40e899ec5f"],
    ["Test", "0cbc6611f5540bd0809a388dc95a615b"],
    ["@auaust/toolkit", "bd485f24123c80225f2473b5c71b84e2"],
    ["\u{1F600}", "2a02eac39d716a70ecf37579185927b6"],
    ["\uD800", "546d3dc8de10fbf8b448f678a47901e4"],
  ])("hashes %s", (input, hash) => {
    expect(md5(input)).toBe(hash);
    expectTypeOf(md5(input)).toEqualTypeOf<string>();
  });

  test.for(
    createValues().filter((input) => {
      return typeof input !== "string";
    }),
  )("rejects non-string %s", (input) => {
    // @ts-expect-error Non-string inputs are rejected at runtime too.
    expect(() => md5(input)).toThrow(TypeError);
  });
});
