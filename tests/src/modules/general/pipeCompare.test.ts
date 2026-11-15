import { describe, expect, test } from "vitest";

import { pipeCompare } from "@auaust/toolkit";

describe("pipeCompare", () => {
  test("compares values once transformed", () => {
    expect(pipeCompare((s: string) => s.trim(), " a", "a ")).toBe(true);
    expect(pipeCompare((s: string) => s.trim(), " a", "b ")).toBe(false);
  });

  test("types values after the transform's input", () => {
    expect(() => {
      // @ts-expect-error
      return pipeCompare((s: string) => s.trim(), 1);
    }).toThrow(TypeError);
  });

  test("propagates errors thrown by the transform", () => {
    const error = new Error("transform failed");

    expect(() => {
      return pipeCompare(
        () => {
          throw error;
        },
        "a",
        "b",
      );
    }).toThrow(error);
  });
});
