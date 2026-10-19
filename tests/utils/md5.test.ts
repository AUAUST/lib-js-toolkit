import { md5 } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("md5()", () => {
  test("computes the MD5 hash of a given string", () => {
    const hashes = {
      " ": "7215ee9c7d9dc229d2921a40e899ec5f",
      Test: "0cbc6611f5540bd0809a388dc95a615b",
      "@auaust/toolkit": "bd485f24123c80225f2473b5c71b84e2",
    };

    for (const [input, hash] of Object.entries(hashes)) {
      expect(md5(input)).toBe(hash);
    }
  });

  test("throws a TypeError if the input is not a string", () => {
    const invalidInputs = [null, undefined, 42, {}, [], () => {}];

    for (const input of invalidInputs) {
      expect(() => md5(input as any)).toThrow(TypeError);
    }
  });
});
