import { describe, expect, test } from "vitest";

import { camel, toCamelCase } from "@auaust/toolkit/string";

describe("toCamelCase", () => {
  test("lowercases the first word and capitalizes the others", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
    expect(camel).toBe(toCamelCase);
  });

  test("follows the locale", () => {
    expect(toCamelCase("TITLE ISTANBUL", { locale: "tr" })).toBe(
      "tıtleIstanbul",
    );
  });
});
