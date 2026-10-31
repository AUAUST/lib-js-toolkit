import { describe, expect, test } from "vitest";

import * as toolkit from "@auaust/toolkit";
import * as guard from "@auaust/toolkit/guard";

describe("guard", () => {
  test.for(Object.entries(guard))(
    "exposes %s from both the root and the guard entry",
    ([name, candidate]) => {
      expect(toolkit).toHaveProperty(name, candidate);
    },
  );

  test("keeps guards out of the domain entries", () => {
    const names = Object.keys(guard);

    for (const domain of [
      toolkit.array,
      toolkit.async,
      toolkit.boolean,
      toolkit.function,
      toolkit.math,
      toolkit.number,
      toolkit.object,
      toolkit.string,
    ]) {
      expect(
        Object.keys(domain).filter((name) => names.includes(name)),
      ).toEqual([]);
    }
  });
});
