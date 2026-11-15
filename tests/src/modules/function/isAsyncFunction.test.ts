import { runInNewContext } from "node:vm";

import { describe, expect, expectTypeOf, test } from "vitest";

import { isAsyncFunction } from "@auaust/toolkit/function";
import type { AsyncFn } from "@auaust/toolkit";

describe("isAsyncFunction", () => {
  test("recognizes async functions only", () => {
    expect(isAsyncFunction(async () => {})).toBe(true);
    expect(isAsyncFunction(() => Promise.resolve())).toBe(false);
    expect(isAsyncFunction(async function* () {})).toBe(false);
    expect(isAsyncFunction({})).toBe(false);
  });

  test("keeps the tag of a function from another realm", () => {
    expect(isAsyncFunction(runInNewContext("(async () => {})"))).toBe(true);
  });

  test("narrows on both branches", () => {
    const candidate = (() => {}) as AsyncFn | string;

    if (isAsyncFunction(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<AsyncFn>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  });
});
