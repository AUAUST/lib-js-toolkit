import { describe, expect, expectTypeOf, test } from "vitest";

import { defer, type DeferPromise } from "@auaust/toolkit/async";

import { primitiveValues } from "#tests/fixtures/values";

describe("defer", () => {
  test.for(primitiveValues)("resolves externally to %s", async (value) => {
    const deferred = defer<typeof value>();

    expectTypeOf(deferred).toEqualTypeOf<DeferPromise<typeof value>>();

    deferred.resolve(value);

    await expect(deferred).resolves.toBe(value);
  });

  test.for(primitiveValues)("rejects externally with %s", async (reason) => {
    const deferred = defer<never>();
    const rejected = expect(deferred).rejects.toBe(reason);

    deferred.reject(reason);

    await rejected;
  });
});
