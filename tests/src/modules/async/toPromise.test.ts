import { describe, expect, expectTypeOf, test } from "vitest";

import { awaitable, toPromise } from "@auaust/toolkit/async";

describe("toPromise", () => {
  test("resolves a plain value", async () => {
    await expect(toPromise(1)).resolves.toBe(1);
  });

  test("adopts a promise and a thenable without nesting", async () => {
    const thenable: PromiseLike<number> = {
      // eslint-disable-next-line auaust/no-thenable -- the case under test adopts a thenable
      then: (resolve) => Promise.resolve(2).then(resolve),
    };

    const promise = toPromise(Promise.resolve("a"));
    const adopted = toPromise(thenable);

    expectTypeOf(promise).toEqualTypeOf<Promise<string>>();

    expectTypeOf(adopted).toEqualTypeOf<Promise<number>>();

    await expect(promise).resolves.toBe("a");

    await expect(adopted).resolves.toBe(2);
  });

  test("works as a detached callback", async () => {
    const promises = [1, Promise.resolve(2)].map(toPromise);

    await expect(Promise.all(promises)).resolves.toStrictEqual([1, 2]);
  });

  test("awaitable is the same function", () => {
    expect(awaitable).toBe(toPromise);
  });
});
