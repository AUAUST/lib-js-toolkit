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

  test("drops characters that are not part of a word", () => {
    expect(toCamelCase("project/build")).toBe("projectBuild");
  });

  test("keeps letters of any script", () => {
    expect(toCamelCase("élan vital")).toBe("élanVital");
  });

  test("keeps digit boundaries", () => {
    expect(toCamelCase("2fa-code")).toBe("2FaCode");
  });
});
