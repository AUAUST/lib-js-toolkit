import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { awaitAll, concurrent } from "@auaust/toolkit/async";

describe("awaitAll", () => {
  test("resolves each key of a record, returning functions uncalled", async () => {
    const fn = vi.fn();

    const result = awaitAll({
      foo: Promise.resolve(1),
      bar: "a",
      fn,
    });

    expectTypeOf(result).toEqualTypeOf<
      Promise<{ foo: number; bar: string; fn: typeof fn }>
    >();

    await expect(result).resolves.toStrictEqual({
      foo: 1,
      bar: "a",
      fn,
    });

    expect(fn).not.toHaveBeenCalled();
  });

  test("resolves a tuple in order", async () => {
    const result = awaitAll([Promise.resolve(1), "a"]);

    expectTypeOf(result).toEqualTypeOf<Promise<[number, "a"]>>();

    await expect(result).resolves.toStrictEqual([1, "a"]);
  });

  test("rejects with the reason of a rejecting member", async () => {
    const reason = new Error("rejected");

    await expect(
      awaitAll({ ok: Promise.resolve(1), failed: Promise.reject(reason) }),
    ).rejects.toBe(reason);
  });

  test("ignores symbol keys", async () => {
    const symbol = Symbol("key");

    const result = awaitAll({ foo: 1, [symbol]: Promise.resolve(2) });

    expectTypeOf(result).toEqualTypeOf<Promise<{ foo: number }>>();

    await expect(result).resolves.toStrictEqual({ foo: 1 });
  });

  test("resolves null to undefined", async () => {
    await expect(awaitAll(null)).resolves.toBeUndefined();
  });

  test("concurrent is the same function", () => {
    expect(concurrent).toBe(awaitAll);
  });
});
