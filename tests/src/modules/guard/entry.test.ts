import { describe, expect, test } from "vitest";

import * as toolkit from "@auaust/toolkit";
import * as composer from "@auaust/toolkit/composer";
import * as guard from "@auaust/toolkit/guard";
import * as string from "@auaust/toolkit/string";

describe("guard", () => {
  test.for(Object.entries(guard))(
    "exposes %s from both the root and the guard entry",
    ([name, candidate]) => {
      expect(toolkit).toHaveProperty(name, candidate);
    },
  );

  test("shares each guard's identity with the entry of its module", () => {
    expect(string.isString).toBe(guard.isString);
    expect(composer.isPropertyComposer).toBe(guard.isPropertyComposer);

    for (const domain of [
      toolkit.array,
      toolkit.async,
      toolkit.boolean,
      toolkit.composer,
      toolkit.function,
      toolkit.number,
      toolkit.object,
      toolkit.string,
    ]) {
      for (const [name, candidate] of Object.entries(domain)) {
        if (name in guard) {
          expect(guard).toHaveProperty(name, candidate);
        }
      }
    }
  });
});
