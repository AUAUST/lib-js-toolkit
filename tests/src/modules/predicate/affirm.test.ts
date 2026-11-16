import { describe, expect, test } from "vitest";

import { identity } from "@auaust/toolkit/general";
import { affirm, notnot } from "@auaust/toolkit/predicate";

describe("affirm", () => {
  test("returns the boolean of the result", () => {
    expect([0, 1, "", "a"].filter(affirm(identity))).toEqual([1, "a"]);
    expect(affirm(identity).name).toBe("affirmed");
  });

  test("is aliased notnot", () => {
    expect(notnot).toBe(affirm);
  });
});
