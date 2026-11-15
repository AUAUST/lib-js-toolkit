import { describe, expect, test } from "vitest";

import { unaccent } from "@auaust/toolkit/string";

describe("unaccent", () => {
  test("drops diacritics and spells out ligatures", () => {
    expect(unaccent("Œuvre à côté")).toBe("OEuvre a cote");
  });

  test("passes nullish input through", () => {
    expect(unaccent(undefined)).toBeUndefined();
  });
});
