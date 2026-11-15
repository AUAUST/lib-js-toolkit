import { describe, expectTypeOf, test } from "vitest";

import type {
  ReadonlySetLike,
  SetLike,
  WritableSetLike,
} from "@auaust/toolkit/setlike";

describe("SetLike", () => {
  test("accepts a WeakSet", () => {
    expectTypeOf<WeakSet<object>>().toExtend<SetLike<object>>();

    expectTypeOf<SetLike<string>>().toExtend<
      ReadonlySetLike<string> & WritableSetLike<string>
    >();
  });
});
