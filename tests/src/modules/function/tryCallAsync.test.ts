import { describe, expect, expectTypeOf, test } from "vitest";

import { tryCallAsync } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("tryCallAsync", () => {
  test("resolves to the awaited result", async () => {
    const result = tryCallAsync((value: number) => {
      return Promise.resolve(value * 2);
    }, 2);

    expectTypeOf(result).toEqualTypeOf<Promise<number | undefined>>();

    await expect(result).resolves.toBe(4);
  });

  test("resolves to undefined on a rejection or a throw", async () => {
    await expect(
      tryCallAsync(() => Promise.reject(new Error("failure"))),
    ).resolves.toBeUndefined();

    await expect(
      tryCallAsync(() => {
        throw new Error("failure");
      }),
    ).resolves.toBeUndefined();
  });

  test("forwards the receiver to callables", async () => {
    const counter = {
      value: 2,
      [callable]() {
        return this.value;
      },
    };

    await expect(tryCallAsync.call({ value: 3 }, counter)).resolves.toBe(3);
  });
});
