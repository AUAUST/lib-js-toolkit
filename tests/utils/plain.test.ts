import { describe, expect, expectTypeOf, test } from "vitest";

import { plain } from "@auaust/toolkit";

import { createObjects } from "../fixtures/values";

describe("plain", () => {
  test("creates a fresh null-prototype object", () => {
    const result = plain();

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result).toEqual({});
    expect(plain()).not.toBe(result);
  });

  test.for(createObjects())(
    "copies own enumerable properties from %s",
    (input) => {
      const result = plain(input);

      expect(Object.getPrototypeOf(result)).toBeNull();
      expect(result).not.toBe(input);
      expect({
        ...result,
      }).toEqual({
        ...input,
      });
      expectTypeOf(result).toEqualTypeOf<typeof input>();
    },
  );
});
