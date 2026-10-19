import { defer } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("defer()", () => {
  test("creates a promise that can be resolved externally", () => {
    const deferred = defer<number>();

    let resolvedValue: number | undefined;

    deferred.then((value) => {
      resolvedValue = value;
    });

    deferred.resolve(42);

    return deferred.then(() => {
      expect(resolvedValue).toBe(42);
    });
  });

  test("creates a promise that can be rejected externally", () => {
    const deferred = defer<number>();

    let rejectedReason: any;

    deferred.catch((reason) => {
      rejectedReason = reason;
    });

    deferred.reject(new Error("Test Error"));

    return deferred.catch(() => {
      expect(rejectedReason).toBeInstanceOf(Error);
      expect(rejectedReason.message).toBe("Test Error");
    });
  });
});
