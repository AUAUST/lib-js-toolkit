import { expect, test } from "vitest";

import { toLocaleString } from "@auaust/toolkit/number";

test("matches the method", () => {
  expect(toLocaleString(1234.5, "de-CH", { style: "percent" })).toBe(
    (1234.5).toLocaleString("de-CH", { style: "percent" }),
  );

  expect(toLocaleString(1234.5)).toBe((1234.5).toLocaleString());
});
