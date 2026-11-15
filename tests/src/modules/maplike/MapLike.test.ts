import { describe, expectTypeOf, test } from "vitest";

import type {
  MapLike,
  ReadonlyMapLike,
  WritableMapLike,
} from "@auaust/toolkit/maplike";

describe("MapLike", () => {
  test("accepts a WeakMap and a plain object implementing has, get and set", () => {
    const store = {
      has: (key: string) => key === "a",
      get: (key: string) => {
        return key === "a" ? 1 : undefined;
      },
      set: (_key: string, _value: number) => store,
    };

    expectTypeOf<WeakMap<object, number>>().toExtend<MapLike<object, number>>();
    expectTypeOf(store).toExtend<MapLike<string, number>>();

    expectTypeOf<MapLike<string, number>>().toExtend<
      ReadonlyMapLike<string, number> & WritableMapLike<string, number>
    >();
  });
});
